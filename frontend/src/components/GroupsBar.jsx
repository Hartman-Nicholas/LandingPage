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

  const groupCreatedTitles = groupCreated.map((item) => {
    return <GroupCard key={item.id} title={item.title} />;
  });

  useEffect(() => {
    setUserData(data);
  }, []);

  return (
    <section id="sidebar">
      <div className="sidebarWrapper">
        <button className="sidebarButtonTop">
          <Link to="/groups">Join a new group +</Link>
        </button>
        <h2>joined :</h2>
        {groupsJoined}
        <h2>created :</h2>
        <ul className="list">
          <li className="listItem">
            <span>{groupCreated}</span>
            {/* <span className="listItemText"> {groupCreated}</span> */}
          </li>
        </ul>
        <button className="sidebarButtonBottom">
          <Link to="/groups/create">+ Create a group</Link>
        </button>
      </div>
    </section>
  );
};
