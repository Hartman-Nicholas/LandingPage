import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get("/users");
  }

  userNameExists(username) {
    return Api.get(`/register/${username}`);
  }

  emailExists(email) {
    return Api.get(`/register/email/${email}`);
  }

  isFirstLogIn() {
    return Api.post("/users");
  }

  updateUser(body) {
    return Api.put("/users", body);
  }

  deleteUser(){
    return Api.delete(`/users`)
  }
}

export default new UserApi();
