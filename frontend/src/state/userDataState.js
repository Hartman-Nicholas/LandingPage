import { atom } from "recoil";
// import { recoilPersist } from 'recoil-persist'

// const { persistAtom } = recoilPersist()

export const userDataState = atom({
  key: "userData",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});


export const groupDataState = atom({
  key: "groupData",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});

export const postDataState = atom({
  key: "postData",
  default: [],
  // effects_UNSTABLE: [persistAtom],
});

