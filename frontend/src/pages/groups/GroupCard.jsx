// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

// Project files
import { userDataState } from "../../state/userDataState";
import TagRow from '../../components/TagRow';

export const GroupCard = ({ groupData, joinGroup, leaveGroup }) => {
	console.log({groupData});

	console.log("TOPICS", groupData?.topics)
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
    <>
      <div className="group-container">
        <div className="group-image">
          <Link to={`/groups/${groupData.id}/home`}>
            <img
              src={groupData.avatar}
              alt="group"
              style={{
                width: "95%",
                objectFit: "contain",
              }}
            />
          </Link>
        </div>
        <p className="author-text">
          <span>
            <ReactTimeAgo date={new Date(groupData.created)} locale="en-US" />
          </span>
          <span>{groupMembers.length} members</span>
        </p>
        {/* <TagRow tags={groupData.topics} /> */}

        <h3 className="itemTitle">{groupData.title}</h3>

        <p className="description-text"> {groupData.description}</p>

        {groupData.groupOwner !== userData.name &&
          groupMembers.includes(userData.name) && (
            <button name="unjoin" onClick={handleClick} className="btn">
              <span>Unjoin Group</span>
            </button>
          )}

        {groupData.groupOwner !== userData.name &&
          !groupMembers.includes(userData.name) && (
            <button
              name="join"
              onClick={() => joinGroup(groupData.id)}
              className="btn"
            >
              <span>Join Group</span>
            </button>
          )}
      </div>
    </>
  );
};
