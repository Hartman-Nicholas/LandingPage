// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import {  useState } from "react";

// Project files
import { userDataState } from "../../state/userDataState";

export const GroupCard = ({ groupData, joinGroup, leaveGroup }) => {
	// State
	const [userData, setUserData] = useRecoilState(userDataState);
	const [groupMembers, setGroupMembers] = useState(groupData.members);

	// Constants
	const handleClick = (e) => {
		e.preventDefault();
		leaveGroup(groupData.id);
		 let filteredGroup= userData.groupsJoined.filter(group => group.id !== groupData.id)
      setUserData({...userData, groupsJoined: filteredGroup});
		}

	// Components

	return (
		<div>
			<Link to={`/groups/${groupData.id}/home`}>
				<div>
					<img
						src={groupData.avatar}
						alt="group"
						style={{ width: "100px", height: "100px", borderRadius: "8px" }}
					/>
					<h1>Group: {groupData.title}</h1>
					<h2>Group Description: {groupData.description}</h2>
					<h3>Admin : {groupData.groupOwner}</h3>
					Created:{" "}
					<ReactTimeAgo date={new Date(groupData.created)} locale="en-US" />
				</div>
			</Link>
			{(groupData.groupOwner !== userData.name &&
				groupMembers.includes(userData.name)) &&(
				<button name="unjoin" onClick={handleClick}>
					Unjoin Group
				</button>
			)}
			{(groupData.groupOwner !== userData.name &&
				!groupMembers.includes(userData.name)) &&(
				<button name="join" onClick={() => joinGroup(groupData.id)}>
					Join Group
				</button>
			)}
		</div>
	);
};


