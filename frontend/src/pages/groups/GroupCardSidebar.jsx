// NPM Packages
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

// Project files
import { userDataState } from "../../state/userDataState";

export const GroupCardSidebar = ({ groupData, joinGroup, leaveGroup }) => {
  // State
  const [userData, setUserData] = useRecoilState(userDataState);
  const [groupMembers] = useState(groupData.members);

  // Constants
  const handleClick = (e) => {
    e.preventDefault();
    leaveGroup(groupData.id);
    let filteredGroup = userData.groupsJoined.filter(
      (group) => group.id !== groupData.id
    );
    setUserData({ ...userData, groupsJoined: filteredGroup });
  };

  return (
    <div className="sidebar-list">
      <Link to={`/groups/${groupData.id}/home`}>
        <div className="sidebar-group-list">
          <div className="sidebar-image">
            <img
              src={groupData.avatar}
              alt="group"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="sidebar-text">
            <h2 className="itemTitle"> {groupData.title}</h2>
          </div>
          <div className="sidebar danger-btn">
            {groupData.groupOwner !== userData.name &&
              groupMembers.includes(userData.name) && (
                <i
                  class="fas fa-times-circle"
                  title="Leave Group"
                  onClick={handleClick}
                ></i>
              )}
          </div>
        </div>
      </Link>
    </div>
  );
};
