// NPM Packages
import { useState, useEffect } from "react";

// Project files
import PostApi from "../../api/PostsApi";
import { ImageUploader } from "../ImageUploader";

export const PostForm = ({ groupId, onSubmit }) => {
  // State

  const [photoUrl, setPhotoUrl] = useState("");
  const [postForm, setPostForm] = useState({
    body: "",
    photo: "",
  });
  // Constants
  async function createPost(requestBody) {
    try {
      await PostApi.createPost(groupId, requestBody).then((res) =>
        onSubmit(res.data)
      );
    } catch (e) {
      console.error(e);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostForm({
      ...postForm,
      [name]: value,
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost(postForm);
    setPostForm({ body: "", photo: "" });
  };

  const handleDiscard = (e) => {
    e.preventDefault();
    setPhotoUrl("");
  };

  useEffect(() => {
    setPostForm({ ...postForm, photo: photoUrl });
  }, [photoUrl]);

  // Components

  return (
    <form className="postForm">
      {postForm.photo !== "" && (
        <div>
          <div className="postForm-avatarContainer">
            <img
              className="postForm--avatar"
              src={postForm.photo}
              alt="User Avatar"
            />
            <div className="postForm--cancelImg">
              <i onClick={handleDiscard} className="fas fa-times"></i>
            </div>
          </div>
        </div>
      )}
      <div className="postForm__textArea form--input">
        <textarea
          value={postForm.body}
          onChange={handleChange}
          placeholder="what's on your mind..."
          type="text"
          name="body"
          required
          maxLength="4000"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
        <label>Your Post</label>
      </div>
      <div className="postForm__img-position">
        <ImageUploader setImageState={setPhotoUrl} />
      </div>

      <div className="postForm__share-position">
        <div className="share" onClick={handleSubmit}>
          <i class="fas fa-share"></i>
        </div>
      </div>
    </form>
  );
};
