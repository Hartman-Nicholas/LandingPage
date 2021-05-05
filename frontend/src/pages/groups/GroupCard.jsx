// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

// Project files
import { groupDataState, userDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";

export const GroupCard = ({ groupData }) => {
  // State
  const [userData, setUserData] = useRecoilState(userDataState);
  const [groupsList, setGroupsList] = useRecoilState(groupDataState);
  const [groupMembers, setGroupMembers] = useState(groupData.members);
  const [groupsJoined, setGroupsJoined] = useState(userData.groupsJoined);
  // Constants

  const addMember = async () => {
    await GroupApi.joinGroup(groupData.id).then(({ data }) => {
      let member = groupMembers.concat(userData.name);
      let updatedGroupsList = groupsList.map((group) =>
        group.id === data.id ? data : group
      );
      setGroupMembers(member);
      setGroupsJoined([...groupsJoined, data]);
      setUserData({ ...userData, groupsJoined });
      setGroupsList(updatedGroupsList);
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    addMember();
  };

  // Components
  useEffect(() => {
    setGroupsJoined(userData.groupsJoined);
    return () => setGroupsJoined([]);
  }, [userData, groupMembers]);

  return (
    <div>
      <Link to={`/groups/${groupData.id}/home`}>
        <div>
          {/* TODO Fix img only renders on the first created group */}

          <div className="listItemContent">
            <div className="tag">●</div>
            <div className="sidebarItemText">
              Group: {groupData.title}
              <div className="non-sidebar-group-Des">
                <img
                  src={groupData.avatar}
                  alt="group"
                  style={{
                    width: "100%",
                    maxHeight: "500px",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
                <p>Group Description: {groupData.description}</p>
                <p>Admin : {groupData.groupOwner}</p>
                Created:{" "}
                <ReactTimeAgo
                  date={new Date(groupData.created)}
                  locale="en-US"
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
      {groupData.groupOwner === userData.name ||
      groupMembers.includes(userData.name) ? null : (
        <button onClick={handleClick}>Join Group</button>
      )}
    </div>
  );
};
