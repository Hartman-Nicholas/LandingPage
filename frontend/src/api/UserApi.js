import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get("/users");
  }
}

export default new UserApi();
