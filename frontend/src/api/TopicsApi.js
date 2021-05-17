import Api from "./Api";

class TopicsApi {
  getTopic(postId) {
    return Api.get(`/topics/${postId}`);
  }
}

export default new TopicsApi();
