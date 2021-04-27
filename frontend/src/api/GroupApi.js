import Api from "./Api";

class GroupApi {
  getAllGroups() {
    return Api.get("/groups");
  }

  getGroupById(id) {
    return Api.get(`/groups/${id}`);
  }

  createGroup(groupData){
    return Api.post("/groups", groupData)
  }
}

export default new GroupApi();
