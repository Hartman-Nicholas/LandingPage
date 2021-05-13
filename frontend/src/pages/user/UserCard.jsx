import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../../state/userDataState";

import EditProfile from "./EditProfile";
import { ImageUploader } from "../../components/ImageUploader";
import UserApi from "../../api/UserApi";

export default function UserCard() {
  // State
  const [userData, setUserData] = useRecoilState(userDataState);
  const [imageUrl, setImageUrl] = useState(userData.avatar);
  const [toggler, setToggler] = useState(false);

  const updateProfile = async (avatar) => {
    try {
      console.log("updateProfile", { avatar });
      const response = await UserApi.updateUser({ avatar });
      console.log({ response });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!imageUrl) {
      return;
    }
    console.log("useEffect for imageUrl", { imageUrl });
    updateProfile(imageUrl);
    console.log({ userData });
  }, [imageUrl]);

  console.log({ userData });

  // Constants

  // Components
  return (
    <section>
      <h1>UserCard Template</h1>
      <div className="listItem">
        <img className="groupForm--avatar" src={userData.avatar} alt="avatar" />
      </div>
      <ImageUploader setImageState={setImageUrl} />

      <div className="listItem">Name: {userData.name}</div>
      <div className="listItem">Email: {userData.email}</div>
      <div className="listItem">Bio: {userData.bio}</div>

      <button onClick={() => setToggler(!toggler)}>Edit Profile</button>
      {toggler && (
        <EditProfile currentUser={userData} setToggler={setToggler} />
      )}

      <div>
        <ul className="list">
          <li className="listItem">
            <label htmlFor="">Created </label>
          </li>
          <li className="listItem">{userData?.groupsCreated?.length}</li>
        </ul>
      </div>
      <div>
        <ul className="list">
          <li className="listItem">
            <label htmlFor="">Joined </label>
          </li>
          {userData?.groupsJoined?.length}
        </ul>
      </div>
      <div>
        <ul className="list">
          <li className="listItem">
            <label htmlFor="">Posts </label>
          </li>
          <li className="listItem">{userData?.posts?.length}</li>
        </ul>
      </div>
      <div>
        <ul className="list">
          <li className="listItem">
            <label htmlFor="">Comments </label>
          </li>
          <li className="listItem">{userData?.comments?.length}</li>
        </ul>
      </div>
    </section>
  );
}
