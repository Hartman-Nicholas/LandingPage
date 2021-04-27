// NPM Packages
import { useRecoilValue } from "recoil";
import ReactTimeAgo from "react-time-ago";
// Project files
import { groupDataState, userDataState } from "../../state/userDataState";
import { GroupForm } from "./GroupForm";
import { GroupCard } from "./GroupCard";

export const Groups = () => {
	// State
	const groupsData = useRecoilValue(groupDataState);
	const userData = useRecoilValue(userDataState);

	// Constants
	const filteredGroup = groupsData.filter(
		(group) => group.groupOwner === userData.name
	);
	// Components
	return (
		<div>
			<h1>All Groups</h1>
			<br />
			{groupsData.length === 0
				? "No groups available"
				: groupsData.map((group) => (
						<GroupCard key={group.id} groupData={group} />
				  ))}
			<br />
			<h1>Groups owned by you:</h1>
			{filteredGroup.length === 0
				? "You have no groups"
				: filteredGroup.map((group) => (
						<GroupCard key={group.id} groupData={group} />
				  ))}
			<br />
			<h1>Create a group:</h1>
			<GroupForm />
		</div>
	);
};
