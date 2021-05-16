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
    <section className="userCard">
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
          <div className="userCard__info">
            <p>Name:</p>
            <p>{userData.name}</p>
            <p>Email:</p>
            <p>{userData.email}</p>
            <p>Bio:</p>
            <p>{userData.bio}</p>
            <p>Groups Created:</p>
            <p>{userData.groupsCreated?.length}</p>
            <p>Groups Joined:</p>
            <p> {userData.groupsJoined?.length}</p>
            <p>Posts:</p>
            <p>{userData.posts?.length}</p>
            <p>Comments:</p>
            <p>{userData.comments?.length}</p>
            <p></p>
          </div>
        </div>
      )}

      <div className="userCard__buttons">
        <button className="btn-cancel" onClick={handleDelete}>
          Delete profile
        </button>
        <button className="btn-blue" onClick={() => setToggler(!toggler)}>
          Edit Profile
        </button>
      </div>

      {toggler && <EditProfile setToggler={setToggler} />}
    </section>
  );
}
