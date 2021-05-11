// NPM Packages
import { useState } from "react";

// Project files
import PostApi from "../../api/PostsApi";
import { ImageUploader } from "../ImageUploader";

export const EditPostForm = ({ data, onSubmit, postId, setPhoto }) => {
  // State
  const [imageUrl, setImageUrl] = useState(data.photo);
  const [postForm, setPostForm] = useState({
    body: data.body,
    photo: data.photo,
  });
  // Constants
  async function postUpdate(id, requestBody) {
    try {
      await PostApi.updatePost(id, requestBody).then(
        ({ data: { body, photo } }) => onSubmit({ body, photo })
      );
    } catch (e) {
      console.error(e);
    }
  }

  const handleDiscard = (e) => {
    e.preventDefault();
    setImageUrl("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostForm({
      ...postForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postForm.photo = imageUrl;
    setPhoto(imageUrl);
    postUpdate(postId, postForm);
  };

  // Components

  return (
    <form onSubmit={handleSubmit}>
      <div className="form--input">
        <textarea
          value={postForm.body}
          onChange={handleChange}
          placeholder="what's on your mind..."
          type="text"
          name="body"
          required
          maxLength="255"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Your edits here</label>
      </div>

      <div className="postForm">
        {imageUrl !== "" && (
          <div className="postForm-avatarContainer">
            <img
              className="postForm--avatar"
              src={imageUrl}
              alt="User Avatar"
            />
            <div className="postForm--cancelImg">
              <i onClick={handleDiscard} className="fas fa-times"></i>
            </div>
          </div>
        )}
      </div>
      <ImageUploader setImageState={setImageUrl} />
      <div onClick={handleSubmit}>
        <i className="fas fa-check"></i>
      </div>
    </form>
  );
};
