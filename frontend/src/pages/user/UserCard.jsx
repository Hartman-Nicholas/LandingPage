import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../../state/userDataState";
import { useHistory } from "react-router-dom";

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
      const response = await UserApi.updateUser({ avatar });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const history = useHistory();

  const handleDelete = async () => {
    const confirmBox = window.confirm(
      "Deleting your User Profile is irreversible all groups data and posts will be lost!! Please confirm you would like to continue."
    );
    if (confirmBox) {
      await UserApi.deleteUser().then(history.push("/"));
    }
  };

  useEffect(() => {
    if (!imageUrl) {
      return;
    }
    updateProfile(imageUrl);
  }, [imageUrl]);

  // Constants

  // Components
  return (
    <section>
      {!toggler && (
        <div>
          <div className="custom-file-upload">
            <img
              className="img-wrap img-upload"
              src={userData.avatar}
              alt="avatar"
            />
          </div>
          <ImageUploader setImageState={setImageUrl} />

          <div className="listItem">Name: {userData.name}</div>
          <div className="listItem">Email: {userData.email}</div>
          <div className="listItem">Bio: {userData.bio}</div>

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
        </div>
      )}

      <button onClick={handleDelete}>Delete profile</button>

      <button onClick={() => setToggler(!toggler)}>Edit Profile</button>
      {toggler && <EditProfile setToggler={setToggler} />}
    </section>
  );
}
