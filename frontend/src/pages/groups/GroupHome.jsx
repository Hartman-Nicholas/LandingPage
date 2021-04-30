// NPM Packages

// Project files
import { GroupHeader } from "./group-details/GroupHeader";

export const GroupHome = (props) => {
	// State

	const { groupData } = props.location.state.fromNotifications;

	// Variables

	// Components

	return (
		<div>
			<h1>{groupData.title}</h1>
			<h1>{groupData.id}</h1>
			<GroupHeader groupId={groupData.id} group={groupData} />
		</div>
	);
};
