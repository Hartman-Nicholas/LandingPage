import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../../state/userDataState";

import UserApi from "../../api/UserApi";

export default function EditProfile({ setToggler, onSubmit }) {
  console.log({ setToggler });
  // State
  const [userData, setUserData] = useRecoilState(userDataState);
  console.log({ userData, setUserData });

  const [userForm, setUserForm] = useState({
    name: userData.name,
    email: userData.email,
    bio: userData.bio,
  });

  // Constants

  // input validation
  const userNameExists = async (value) => {
    if (value === userForm.name) {
      return;
    }
    const exists = await UserApi.userNameExists(value)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    if (exists) {
      return "User Name already exists. Please choose other name.";
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    console.log("handleChange", { name, value });
    setUserForm({ ...userForm, [name]: value });
    console.log({ userForm });
  };

  //TODO: add modal confirm success
  //TODO: name, email validation check
  const updateProfile = async () => {
    try {
      const response = await UserApi.updateUser(userForm);
      // alert("Your profile is successfully updated!");
      console.log({ response });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
      // alert("Failed to update!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(userForm);
    setToggler(false);
    console.log("handle Submit", { userForm });
  };

  // Components
  return (
    <div>
      Edit Profile Form
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              required
              name="name"
              value={userForm.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              required
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Bio</label>
            <textarea
              type="text"
              name="bio"
              value={userForm.bio}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            setToggler={false}
            // onClick={() => {
            //   if (window.confirm("Are you sure you wish to delete this item?"))
            //     this.onCancel(onSubmit);
            // }}
          >
            Save{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
