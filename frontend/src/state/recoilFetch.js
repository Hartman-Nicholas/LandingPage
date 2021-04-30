import { selector } from "recoil";
import { userDataState, groupDataState, postDataState } from "./userDataState";
import UserApi from "../api/UserApi";
import GroupsApi from "../api/GroupApi";
import PostsApi from "../api/PostsApi";

export const getUserData = selector({
	key: "data",
	get: async ({ get }) => {
		get(userDataState);

		const userData = UserApi.getUser();

		return userData;
	},
});

export const getGroupsList = selector({
  key: "groupsList",
  get: async({get}) => {
    get(groupDataState);
    const groupList = GroupsApi.getAllGroups();
    return groupList;
  }
})

export const getPostsList = selector({
  key: "postsList",
  get: async({get}) => {
    get(postDataState);
    const postsList = PostsApi.getAllPosts();
    return postsList;
  }
})

