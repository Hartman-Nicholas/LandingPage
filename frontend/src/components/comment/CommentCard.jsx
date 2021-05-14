// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// Project files
import { userDataState } from "../../state/userDataState";
import { EditCommentForm } from "./EditCommentForm";
import CommentsApi from "../../api/CommentsApi";

export const CommentCard = ({
  data: {
    id,
    body,
    userCommentOwner,
    created,
    updated,
    commentDislikes,
    commentLikes,
  },
  handleDelete,
  groupOwner,
}) => {
  // State
  const [toggler, setToggler] = useState(false);
  const { name: userInSession } = useRecoilValue(userDataState);
  const [commentBody, setCommentBody] = useState(body);
  const [likeToggler, setLikeToggler] = useState();
  const [dislikeToggler, setDislikeToggler] = useState();
  const [likesCount, setLikesCount] = useState(commentLikes?.length | 0);
  const [dislikeCount, setDislikeCount] = useState(commentDislikes?.length | 0);

  useEffect(() => {
    const likeStatus = async () => {
      await CommentsApi.checkLikeComment(id).then(({ data }) =>
        setLikeToggler(data)
      );
    };

    const dislikeStatus = async () => {
      await CommentsApi.checkDislikeComment(id).then(({ data }) =>
        setDislikeToggler(data)
      );
    };

    likeStatus();
    dislikeStatus();
  }, [id]);

  // Constants
  const handleLike = () => {
    if (likeToggler) {
      setLikesCount(likesCount - 1);
      deleteLikeComment();
      setLikeToggler(false);
    } else {
      likeComment();
      setLikesCount(likesCount + 1);
      setLikeToggler(true);
      if (dislikeToggler) {
        setDislikeCount(dislikeCount - 1);
        setLikesCount(likesCount + 1);
        deleteDislikeComment();
        setDislikeToggler(false);
      }
    }
  };

  const likeComment = async () => {
    try {
      await CommentsApi.likeComment(id).then(({ data }) =>
        setLikeToggler(data)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const deleteLikeComment = async () => {
    try {
      await CommentsApi.deletelikeComment(likeToggler.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDislike = () => {
    if (dislikeToggler) {
      setDislikeCount(dislikeCount - 1);
      deleteDislikeComment();
      setDislikeToggler(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      dislikeComment();
      setDislikeToggler(true);
      if (likeToggler) {
        setDislikeCount(dislikeCount + 1);
        setLikesCount(likesCount - 1);
        deleteLikeComment();
        setLikeToggler(false);
      }
    }
  };

  const dislikeComment = async () => {
    try {
      await CommentsApi.dislikeComment(id).then(({ data }) =>
        setDislikeToggler(data)
      );
    } catch (e) {
      console.error(e);
    }
  };

  const deleteDislikeComment = async () => {
    try {
      await CommentsApi.deleteDislikeComment(dislikeToggler.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdate = (updatedComment) => {
    setCommentBody(updatedComment);
    setToggler(false);
  };
  // Components

  return (
    <div>
      {!toggler && (
        <div className="commentCard">
          <p className="postCard__card--owner">{userCommentOwner}</p>
          <div className="commentCard__card--created">
            {created ? "Created: " : "Last updated: "}
            <ReactTimeAgo
              date={new Date(created ? created : updated)}
              locale="en-US"
            />
          </div>
          <p className="commentCard__card--body">{commentBody}</p>

          {userCommentOwner === userInSession && (
            <div className="commentCard__card--edit">
              <i onClick={() => setToggler(true)} className="fas fa-edit"></i>
            </div>
          )}
          {groupOwner | (userCommentOwner === userInSession) && (
            <div className="postCard__card--delete">
              <i
                onClick={() => handleDelete(id)}
                className="fas fa-trash-alt"
              ></i>
            </div>
          )}
          {likeToggler ? (
            <div className="postCard__card--like">
              <i onClick={handleLike} className="fas fa-thumbs-up">
                <span className="postCard__card--likesCount">{likesCount}</span>
              </i>
            </div>
          ) : (
            <div className="postCard__card--like">
              <i onClick={handleLike} className="far fa-thumbs-up">
                <span className="postCard__card--likesCount">{likesCount}</span>
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
      )}
      {toggler && (
        <div className="commentCard__edit">
          <EditCommentForm
            data={commentBody}
            onSubmit={handleUpdate}
            commentId={id}
          />
          <div className="postForm__edit--cancel-position">
            <div className="commentForm__edit--cancel">
              <i
                onClick={() => setToggler(false)}
                className="fas fa-times fa-times-cancel-edits"
              ></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
