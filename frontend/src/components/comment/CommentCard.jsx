// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

// Project files
import { userDataState } from "../../state/userDataState";
import { EditCommentForm } from "./EditCommentForm";
import CommentsApi from "../../api/CommentsApi";

export const CommentCard = ({
  data: { id, body, userCommentOwner, created, updated },
  handleDelete,
  groupOwner,
}) => {
  // State
  const [toggler, setToggler] = useState(false);
  const { name: userInSession } = useRecoilValue(userDataState);
  const [commentBody, setCommentBody] = useState(body);
  const [likeToggler, setLikeToggler] = useState();
  const [dislikeToggler, setDislikeToggler] = useState();

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
      deleteLikeComment();
      setLikeToggler(false);
    } else {
      likeComment();
      setLikeToggler(true);
      if (dislikeToggler) {
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
      deleteDislikeComment();
      setDislikeToggler(false);
    } else {
      dislikeComment();
      setDislikeToggler(true);
      if (likeToggler) {
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
        <>
          <h3>{commentBody}</h3>
          <h3>By: {userCommentOwner}</h3>
          {userCommentOwner === userInSession && (
            <>
              <button onClick={() => setToggler(true)}>Edit</button>
            </>
          )}
          {groupOwner | (userCommentOwner === userInSession) && (
            <i
              onClick={() => handleDelete(id)}
              className="fas fa-trash-alt"
            ></i>
          )}
          {likeToggler ? (
            <div>
              <i onClick={handleLike} className="fas fa-thumbs-up"></i>
            </div>
          ) : (
            <div>
              <i onClick={handleLike} className="far fa-thumbs-up"></i>
            </div>
          )}

          {dislikeToggler ? (
            <div>
              <i onClick={handleDislike} className="fas fa-thumbs-down"></i>
            </div>
          ) : (
            <div>
              <i onClick={handleDislike} className="far fa-thumbs-down"></i>
            </div>
          )}
          {created ? "Created: " : "Last updated: "}
          <ReactTimeAgo
            date={new Date(created ? created : updated)}
            locale="en-US"
          />
        </>
      )}
      {toggler && (
        <>
          <EditCommentForm
            data={commentBody}
            onSubmit={handleUpdate}
            commentId={id}
          />
          <button onClick={() => setToggler(false)}>Close</button>
        </>
      )}
    </div>
  );
};
