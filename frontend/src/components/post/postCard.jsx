// NPM Packages
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import ReactTimeAgo from "react-time-ago";
// Project files
import { CommentCard } from "../comment/CommentCard";
import { CommentForm } from "../comment/CommentForm";
import { userDataState } from "../../state/userDataState";
import { EditPostForm } from "./EditPostForm";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";

export const PostCard = ({
  data: { id, comments, body, postOwner, created },
  handleDelete,
  groupOwner,
}) => {
  // State
  const [commentsData, setCommentsData] = useState(comments);
  const [postBody, setPostBody] = useState(body);
  const [toggler, setToggler] = useState(false);
  const { name: userInSession } = useRecoilValue(userDataState);
  const [commentToggler, setCommentToggler] = useState(false);
  const [likeToggler, setLikeToggler] = useState();
  const [likeId, setLikeId] = useState();

  useEffect(() => {
    setCommentsData(comments ? comments : []);
    const likeStatus = async () => {
      await PostsApi.checkLikePost(id).then(({ data }) => setLikeToggler(data));
    };
    likeStatus();
  }, [comments, id]);

  console.log(likeToggler);

  // Constants
  const handleSubmit = (newComment) => {
    const list = commentsData.concat(newComment);
    setCommentsData(list);
  };

  const deleteComment = async (commentId) => {
    try {
      await CommentsApi.deleteComment(commentId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLike = () => {
    if (likeToggler) {
      deleteLikePost();
      setLikeToggler(false);
    } else {
      likePost();
      setLikeToggler(true);
    }
  };

  const likePost = async () => {
    try {
      await PostsApi.likePost(id).then(({ data }) => setLikeId(data.id));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLikePost = async () => {
    try {
      await PostsApi.deletelikePost(likeId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = (updatedPost) => {
    setPostBody(updatedPost);
    setToggler(false);
  };

  const handleCommentDelete = (DeletedCommentId) => {
    deleteComment(DeletedCommentId);
    const filteredList = commentsData.filter(
      (comment) => comment.id !== DeletedCommentId
    );
    setCommentsData(filteredList);
  };
  // Components
  let commentList =
    commentsData === null || commentsData.length === 0
      ? "No Available comments"
      : commentsData?.map((comment) => (
          <CommentCard
            key={comment.id}
            data={comment}
            handleDelete={handleCommentDelete}
            groupOwner={groupOwner}
          />
        ));
  return (
    <div>
      {!toggler && (
        <div>
          <h1>{postBody}</h1>
          <h3>{postOwner}</h3>
          <div>
            Created: <ReactTimeAgo date={new Date(created)} locale="en-US" />
          </div>
          <button onClick={handleLike}>Like</button>
          <button>DisLike</button>

          {postOwner === userInSession && (
            <>
              <button onClick={() => setToggler(true)}>Edit</button>
            </>
          )}
          {groupOwner | (postOwner === userInSession) && (
            <button onClick={() => handleDelete(id)}>Delete</button>
          )}
          <button onClick={() => setCommentToggler(!commentToggler)}>
            show comments
          </button>
          {commentToggler && (
            <>
              {commentList}
              <CommentForm postId={id} onSubmit={handleSubmit} />
            </>
          )}
        </div>
      )}

      {toggler && (
        <>
          <EditPostForm data={postBody} onSubmit={handleUpdate} postId={id} />
          <button onClick={() => setToggler(false)}>Close</button>
        </>
      )}
    </div>
  );
};
