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

  checkLikePost(postId) {
    return Api.get(`/posts/${postId}/likes/check`);
  }

  likePost(postId) {
    return Api.post(`/posts/${postId}/likes`, { postLike: "like" });
  }

  deletelikePost(likeId) {
    return Api.delete(`/posts/likes/${likeId}`);
  }

  checkDislikePost(postId) {
    return Api.get(`/posts/${postId}/dislikes/check`);
  }

  dislikePost(postId) {
    return Api.post(`/posts/${postId}/dislikes`, { postDislike: "dislike" });
  }

  deleteDislikePost(dislikeId) {
    return Api.delete(`/posts/dislikes/${dislikeId}`);
  }
}

export default new PostsApi();
