// NPM Packages
import { useState } from "react";

// Project files
import CommentsApi from "../../api/CommentsApi";

export const EditCommentForm = ({ data, onSubmit, commentId }) => {
  // State
  const [commentForm, setCommentForm] = useState({
    body: data,
  });

  // Constants
  async function commentUpdate(id, commentData) {
    try {
      await CommentsApi.updateComment(id, commentData).then(
        ({ data: { body } }) => onSubmit(body)
      );
    } catch (e) {
      console.error(e);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentForm({
      ...commentForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    commentUpdate(commentId, commentForm);
  };
  // Components

  return (
    <form onSubmit={handleSubmit}>
      <div className="postForm__textArea form--input">
        <textarea
          value={commentForm.body}
          onChange={handleChange}
          placeholder="write a comment..."
          type="text"
          name="body"
          required
          maxLength="4000"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Your edits here</label>
      </div>

      <div className="editPostForm__share-position">
        <div className="share" onClick={handleSubmit}>
          <i class="fas fa-share"></i>
        </div>
      </div>
    </form>
  );
};
