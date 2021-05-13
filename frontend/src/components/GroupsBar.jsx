// NPM Packages
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

// Project files
import GroupApi from '../api/GroupApi'
import { getUserData } from "../state/recoilFetch";
import { userDataState } from "../state/userDataState";
import { GroupCardSidebar } from "../pages/groups/GroupCardSidebar";

export const GroupsBar = () => {
  // State
  const { data } = useRecoilValue(getUserData);
  const [userData , setUserData] = useRecoilState(userDataState);

  // Constants
	const unsubscribe =async (groupId) => {
    try{
      await GroupApi.unjoinGroup(groupId);
      let filteredGroup= userData.groupsJoined.filter(group => group.id !== groupId)
      setUserData({...userData, groupsJoined: filteredGroup});
    }catch(e){
      console.error(e)
    }
	};

  // Components
  const groupsJoined = data.groupsJoined.map((group) => {
    return <GroupCardSidebar key={group.id} groupData={group} leaveGroup={(id)=> unsubscribe(id)} />;
  });

  const groupCreated = data.groupsCreated.map((group) => {
    return <GroupCardSidebar key={group.id} groupData={group} />;
  });

  useEffect(() => {
    setUserData(data);
  }, []);

  return (
    <section id="sidebar">
      <div className="sidebar-button">
        <button className="sidebarButtonTop">
          <Link to="/groups/create">+ Create a group</Link>
        </button>
        <button className="sidebarButtonBottom">
          <Link to="/groups">Join new group +</Link>
        </button>
      </div>
      <div className="sidebarWrapper">
        {/* <h2>joined :</h2> */}
        {groupsJoined}
        {/* <h2>created :</h2> */}
        {groupCreated}
      </div>
    </section>
  );
};
