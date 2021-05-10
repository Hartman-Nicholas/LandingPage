import {useState} from 'react';
import { useRecoilValue } from "recoil";
import { userDataState } from "../../state/userDataState";

import EditProfile from './EditProfile';
export default function UserCard() {
	const userData = useRecoilValue(userDataState);
  const [toggler, setToggler] = useState(false);

  console.log({userData});

	return (
    <section>
      <h1>UserCard Template</h1>
      {/* <form action="">
        <label htmlFor="">User Name</label>
        <input type="text" value={userData.name} />
      </form>
      <form action="">
        <label htmlFor="">Email</label>
        <input type="text" value={userData.email} />
      </form>
      <form action="">
        <label htmlFor="">Biography</label>
        <input type="text" value={userData.bio} />
      </form> */}
      <div className="listItem">Name: {userData.name}</div>
      <div className="listItem">Email: {userData.email}</div>
      <div className="listItem">Bio: {userData.bio}</div>
      <div>
        <label htmlFor="">Created </label>
        {userData?.groupsCreated?.length} groups
      </div>
      <div>
        <label htmlFor="">Joined </label>
        {userData?.groupsJoined?.length} groups
      </div>
      <div>
        <label htmlFor="">Posts </label>
        {userData?.posts?.length} posts
      </div>
      <div>
        <label htmlFor="">Comments </label>
        {userData?.comments?.length} comments
      </div>
      <div>
        <label htmlFor="">Likes </label>
        {userData?.postLikes?.length} likes
      </div>

      <button onClick={() => setToggler(!toggler)}>Edit Profile</button>
      {toggler&& <EditProfile currentUser = {userData}/>}
    </section>
  );
}
