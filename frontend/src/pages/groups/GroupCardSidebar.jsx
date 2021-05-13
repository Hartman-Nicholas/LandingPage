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
		<div>
			<Link to={`/groups/${groupData.id}/home`}>
				<div>
					<div className="listItemContent">
						<div className="tag">
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
						</div>
						<div className="sidebarItemText">
							<h2 className="itemTitle"> {groupData.title}</h2>
						</div>
					</div>
				</div>
			</Link>
			{groupData.groupOwner !== userData.name &&
				groupMembers.includes(userData.name) && (
					<button name="unjoin" onClick={handleClick}>
						Unjoin Group
					</button>
				)}
			{groupData.groupOwner !== userData.name &&
				!groupMembers.includes(userData.name) && (
					<button name="join" onClick={() => joinGroup(groupData.id)}>
						Join Group
					</button>
				)}
		</div>
	);
};