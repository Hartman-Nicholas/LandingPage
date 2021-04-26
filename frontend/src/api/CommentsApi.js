import Api from "./Api";

class CommentsApi {
  getCommentByPostId(postId) {
    return Api.get("/comments/" + postId);
  }

  createComment(postId, comment) {
    return Api.post("/comments/" + postId, comment);
  }

  updateComment(commentId, comment) {
    return Api.put("/comments/" + commentId, comment);
  }

  deleteComment(commentId) {
    return Api.delete("/comments/" + commentId);
  }
}

export default new CommentsApi();
