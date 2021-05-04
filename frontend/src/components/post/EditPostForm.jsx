// NPM Packages
import { useState } from "react";

// Project files
import PostApi from "../../api/PostsApi";

export const EditPostForm = ({ data, onSubmit }) => {

  // State
  const [postForm, setPostForm] = useState({
    body: data.body,
  });


  // Constants
  async function postUpdate(postId, requestBody) {
    try {
      console.log("requestBody",requestBody)
      await PostApi.updatePost(postId, requestBody).then(({data}) =>
        onSubmit(data.body)
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
    postUpdate(data.id, postForm);
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
