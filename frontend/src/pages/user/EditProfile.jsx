import React, { useState } from "react";
import UserApi from "../../api/UserApi";

export default function EditProfile({ currentUser }) {
  console.log({ currentUser });
  const [userForm, setUserForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: currentUser.bio,
  });

  const handleChange = ({ target: { name, value } }) => {
    console.log("handleChange", { name, value });
    setUserForm({ ...userForm, [name]: value });
    console.log({ userForm });
  };

  const updateProfile = async () => {
    try {
      const response = await UserApi.updateUser(userForm);
      console.log({ response });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(userForm);
  };

  return (
    <div>
      Edit Profile Form
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">Name</label>
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Bio</label>
            <input
              type="text"
              name="bio"
              value={userForm.bio}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
