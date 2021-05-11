import {useState} from 'react';
import { useRecoilValue } from "recoil";
import { userDataState } from "../../state/userDataState";

import EditProfile from './EditProfile';
export default function UserCard() {
  // State
  const userData = useRecoilValue(userDataState);
  const [toggler, setToggler] = useState(false);

  console.log({userData});

  // Constants


  // Components
	return (
    <section>
      <h1>UserCard Template</h1>
      <div className="listItem">
        <img src={userData.avatar} alt="avatar" />
      </div>
      <div className="listItem">Name: {userData.name}</div>
      <div className="listItem">Email: {userData.email}</div>
      <div className="listItem">Bio: {userData.bio}</div>

      <button onClick={() => setToggler(!toggler)}>Edit Profile</button>
      {toggler && (
        <EditProfile currentUser={userData} setToggler={setToggler} />
      )}
      
      <div>
        <label htmlFor="">Created </label>
        {userData?.groupsCreated?.length} 
      </div>
      <div>
        <label htmlFor="">Joined </label>
        {userData?.groupsJoined?.length} 
      </div>
      <div>
        <label htmlFor="">Posts </label>
        {userData?.posts?.length} 
      </div>
      <div>
        <label htmlFor="">Comments </label>
        {userData?.comments?.length} 
      </div>
    </section>
  );
}
