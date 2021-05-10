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
  data: {
    id,
    comments,
    body,
    postOwner,
    created,
    postLikes,
    postDislikes,
    updated,
    groupOwner: postGroup,
    photo,
  },
  handleDelete,
  groupOwner,
}) => {
  // State
  const [commentsData, setCommentsData] = useState(comments);
  const [postBody, setPostBody] = useState({ body: body, photo: photo });
  const [toggler, setToggler] = useState(false);
  const { name: userInSession } = useRecoilValue(userDataState);
  const [commentToggler, setCommentToggler] = useState(false);
  const [likeToggler, setLikeToggler] = useState();
  const [dislikeToggler, setDislikeToggler] = useState();
  const [likesCount, setLikesCount] = useState(postLikes?.length);
  const [dislikeCount, setDislikeCount] = useState(postDislikes?.length);

  useEffect(() => {
    setCommentsData(comments ? comments : []);

    const likeStatus = async () => {
      await PostsApi.checkLikePost(id).then(({ data }) => setLikeToggler(data));
    };

    const dislikeStatus = async () => {
      await PostsApi.checkDislikePost(id).then(({ data }) =>
        setDislikeToggler(data)
      );
    };

    likeStatus();
    dislikeStatus();
  }, [comments, id]);
  //TODO fix like-dislike handlers

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
      setLikesCount(
        likesCount === postLikes.length ? likesCount : likesCount - 1
      );
      deleteLikePost();
      setLikeToggler(false);
    } else {
      likePost();
      setLikesCount(postLikes?.length + 1);
      setLikeToggler(true);
      if (dislikeToggler) {
        setDislikeCount(dislikeCount - 1);
        setLikesCount(likesCount + 1);
        deleteDislikePost();
        setDislikeToggler(false);
      }
    }
  };

  const likePost = async () => {
    try {
      await PostsApi.likePost(id).then(({ data }) => setLikeToggler(data));
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLikePost = async () => {
    try {
      await PostsApi.deletelikePost(likeToggler.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDislike = () => {
    if (dislikeToggler) {
      setDislikeCount(
        dislikeCount === postDislikes?.length ? dislikeCount : dislikeCount - 1
      );
      deleteDislikePost();
      setDislikeToggler(false);
    } else {
      setDislikeCount(postDislikes?.length + 1);
      dislikePost();
      setDislikeToggler(true);
      if (likeToggler) {
        setDislikeCount(dislikeCount + 1);
        setLikesCount(likesCount - 1);
        deleteLikePost();
        setLikeToggler(false);
      }
    }
  };

  const dislikePost = async () => {
    try {
      await PostsApi.dislikePost(id).then(({ data }) =>
        setDislikeToggler(data)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const deleteDislikePost = async () => {
    try {
      await PostsApi.deleteDislikePost(dislikeToggler.id);
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
    <div className="postCard">
      {!toggler && (
        <div className="postCard__card">
          <p className="postCard__card--owner">{postOwner}</p>

          <div className="postCard__card__content">
            {photo !== "" && (
              <div className="postCard__card--imgContainer">
                <img
                  className="postCard__card--img"
                  src={postBody.photo}
                  alt="post"
                />
              </div>
            )}
            <p className="postCard__card--body">{postBody.body}</p>
            <div className="postCard__card__details">
              <p className="postCard__card--postGroup">{postGroup}</p>

              <div className="postCard__card--created">
                {created ? "Created: " : "Last updated: "}
                <ReactTimeAgo
                  date={new Date(created ? created : updated)}
                  locale="en-US"
                />
              </div>
              {likeToggler ? (
                <div className="postCard__card--like">
                  <i onClick={handleLike} className="fas fa-thumbs-up">
                    <span className="postCard__card--likesCount">
                      {likesCount}
                    </span>
                  </i>
                </div>
              ) : (
                <div className="postCard__card--like">
                  <i onClick={handleLike} className="far fa-thumbs-up">
                    <span className="postCard__card--likesCount">
                      {likesCount}
                    </span>
                  </i>
                </div>
              )}

              {dislikeToggler ? (
                <div className="postCard__card--dislike">
                  <i onClick={handleDislike} className="fas fa-thumbs-down">
                    <span className="postCard__card--dislikeCount">
                      {dislikeCount}
                    </span>
                  </i>
                </div>
              ) : (
                <div className="postCard__card--dislike">
                  <i onClick={handleDislike} className="far fa-thumbs-down">
                    <span className="postCard__card--dislikeCount">
                      {dislikeCount}
                    </span>
                  </i>
                </div>
              )}
            </div>
          </div>

          {postOwner === userInSession && (
            <div className="postCard__card--edit">
              <i onClick={() => setToggler(true)} className="fas fa-edit"></i>
            </div>
          )}
          {groupOwner | (postOwner === userInSession) && (
            <div className="postCard__card--delete">
              <i
                onClick={() => handleDelete(id)}
                className="fas fa-trash-alt"
              ></i>
            </div>
          )}

          <div className="postCard__card--comments">
            <i
              onClick={() => setCommentToggler(!commentToggler)}
              className="fas fa-comments"
            ></i>
          </div>

          {commentToggler && (
            <div>
              {commentList}
              <CommentForm postId={id} onSubmit={handleSubmit} />
            </div>
          )}
        </div>
      )}

      {toggler && (
        <div className="postCard__edit">
          <EditPostForm
            data={postBody}
            photo={photo}
            onSubmit={handleUpdate}
            postId={id}
          />
          <button onClick={() => setToggler(false)}>Close</button>
        </div>
      )}
    </div>
  );
};
