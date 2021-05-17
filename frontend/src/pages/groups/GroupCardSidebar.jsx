// NPM Packages
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";

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
          <div className="sidebar-img-container">
            <img className="sidebar-img" src={groupData.avatar} alt="group" />
            <div className="sidebar__groupInfo">
              <p className="sidebar__groupInfo--title">{groupData.title}</p>
              <p className="sidebar__groupInfo--item">
                Members: {groupData.members?.length}
              </p>
              <p className="sidebar__groupInfo--item">
                Posts: {groupData.posts?.length}
              </p>
            </div>
          </div>

          <div className="danger-btn">
            {groupData.groupOwner !== userData.name &&
              groupMembers.includes(userData.name) && (
                <div className="sideBar--leaveGroup">
                  <i
                    class="fas fa-times-circle"
                    title="Leave Group"
                    onClick={handleClick}
                  ></i>
                </div>
              )}
          </div>
        </div>
      </Link>
    </div>
  );
};
