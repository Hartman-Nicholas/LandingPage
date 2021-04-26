import { selector } from "recoil";
import { userDataState } from "./userDataState";
import UserApi from "../api/UserApi";

export const getUserData = selector({
  key: "data",
  get: async ({ get }) => {
    get(userDataState);

    const userData = UserApi.getUser().then((response) => response);

    return userData;
  },
});
