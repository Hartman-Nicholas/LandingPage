// NPM Packages
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

// Project files

import { getUserData } from "../state/recoilFetch";
import { userDataState } from "../state/userDataState";
import { GroupCard } from "../pages/groups/GroupCard";

export const GroupsBar = () => {
  // State
  const { data } = useRecoilValue(getUserData);
  const [, setUserData] = useRecoilState(userDataState);
  // Constants

  // Components
  const groupsJoined = data.groupsJoined.map((group) => {
    return <GroupCard key={group.id} groupData={group} />;
  });

  const groupCreated = data.groupsCreated.map((group) => {
    return <GroupCard key={group.id} groupData={group} />;
  });

  const groupCreatedTitles = groupCreated.map((item)=> {
    return (
      <GroupCard key={item.id} title ={item.title}/>
    )
  }
  )

  useEffect(() => {
    setUserData(data);
  }, []);

  return (
    <section id="groupSideBar">
      <div className="sidebarWrapper">
        <button className="sidebarButtonTop">
          <Link to="/groups/create">+ Create a group</Link>
        </button>
        {/* <h2 className="sidebarTitle">Your Group</h2> */}
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <span>{groupCreated}</span>
            {/* <span className="sidebarListItemText"> {groupCreated}</span> */}
          </li>
        </ul>
        {/* <h2>Groups joined :</h2>
        {groupsJoined} */}
        <button className="sidebarButtonBottom">
          <Link to="/groups">Join a new group +</Link>
        </button>
      </div>
    </section>
  );
};
