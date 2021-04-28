import Api from "./Api";

class UserApi {
  getUser() {
    return Api.get("/users");
  }

  userNameExists(username){
    return Api.get(`/users/${username}`)
  }

  isFirstLogIn(){
    return Api.post("/users")
  }
  updateUser(body){
    return Api.put("/users", body)
  }

  //To be implemented
  // deleteUser(userId){
  //   return Api.delete(`/users/${userId}`)
  // }
}

export default new UserApi();
