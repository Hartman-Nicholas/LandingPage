// NPM Packages
import { useRecoilValue } from "recoil";
// Project files
import { groupDataState, userDataState } from "../../state/userDataState";
import { GroupCard } from "./GroupCard";
import { OwnerGroupsBar } from "./group-details/OwnerGroupBar";

export const Groups = () => {
	// State
	const groupsData = useRecoilValue(groupDataState);
	const userData = useRecoilValue(userDataState);

	// Constants
	const filteredGroup = groupsData.filter(
		(group) => group.groupOwner !== userData.name
	);
	// Components
	return (
		<div>
			<h1>All Groups</h1>
			<br />
			{filteredGroup.length === 0
				? "No groups available"
				: filteredGroup.map((group) => (
						<GroupCard key={group.id} groupData={group} />
				  ))}
			<br />

			<OwnerGroupsBar />
		</div>
	);
};
