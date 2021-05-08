import Api from "./Api";

class PostsApi {
  getAllPosts() {
    return Api.get("/posts");
  }

  getPostById(postId) {
    return Api.get(`/posts/${postId}`);
  }

  createPost(groupId, postData) {
    return Api.post(`/posts/${groupId}`, postData);
  }

  updatePost(postId, postData) {
    return Api.put(`/posts/${postId}`, postData);
  }

  deletePost(postId) {
    return Api.delete(`/posts/${postId}`);
  }

  likePost(postId) {
    return Api.post(`/posts/${postId}/likes`, "like");
  }

  deletelikePost(likeId) {
    return Api.delete(`/posts/likes/${likeId}`);
  }
}

export default new PostsApi();
