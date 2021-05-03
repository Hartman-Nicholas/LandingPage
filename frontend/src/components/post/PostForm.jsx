// NPM Packages
import { useState } from "react";

// Project files
import PostApi from "../../api/PostsApi";

export const PostForm = ({ groupId, onSubmit }) => {

  // State
  const [postForm, setPostForm] = useState({
    body: "",
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
    setPostForm({ body: "" });
  };


  // Components

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postForm.body}
        onChange={handleChange}
        placeholder="what's on your mind..."
        type="text"
        name="body"
        required
        maxLength="255"
      />
      <button type="submit">Submit</button>
    </form>
  );
};
