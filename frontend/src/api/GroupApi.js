import Api from "./Api";

class GroupApi {
  getAllGroups() {
    return Api.get("/groups");
  }

  getGroupById(id) {
    return Api.get(`/groups/${id}`);
  }

  createGroup(groupData) {
    return Api.post("/groups", groupData);
  }
  joinGroup(groupId) {
    return Api.post(`/groups/${groupId}`);
  }
  unjoinGroup(groupId){
    return Api.delete(`/groups/${groupId}/user`)
  }

  joinTopic(groupId, topicId){
    return Api.post(`/groups/${groupId}/topics/${topicId}`)
  }
  unjoinTopic(groupId,topicId){
    return Api.delete(`/groups/${groupId}/topics/${topicId}`)
  }

  updateGroup(body){
    return Api.put("/groups", body)
  }
  deleteGroup(groupId){
    return Api.delete(`/groups/${groupId}`)
  }

}

export default new GroupApi();
