import Api from "./Api";

class CommentsApi {
  getCommentByPostId(postId) {
    return Api.get(`/comments/${postId}`);
  }

  createComment(postId, comment) {
    return Api.post(`/comments/${postId}`, comment);
  }

  updateComment(commentId, comment) {
    return Api.put(`/comments/${commentId}`, comment);
  }

  deleteComment(commentId) {
    return Api.delete(`/comments/${commentId}`);
  }
  checkLikeComment(commentId) {
    return Api.get(`/comments/${commentId}/likes/check`);
  }

  likeComment(commentId) {
    return Api.post(`/comments/${commentId}/likes`, { commentLike: "like" });
  }

  deletelikeComment(likeId) {
    return Api.delete(`/comments/likes/${likeId}`);
  }

  checkDislikeComment(commentId) {
    return Api.get(`/comments/${commentId}/dislikes/check`);
  }

  dislikeComment(commentId) {
    return Api.post(`/comments/${commentId}/dislikes`, {
      commentDislike: "dislike",
    });
  }

  deleteDislikeComment(dislikeId) {
    return Api.delete(`/comments/dislikes/${dislikeId}`);
  }
}

export default new CommentsApi();
