// NPM Packages
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Project files
import { groupDataState } from "../../state/userDataState";
import { GroupHeader } from "./group-details/GroupHeader";

export const GroupHome = () => {
	// State
	const groupsData = useRecoilValue(groupDataState);

	// Variables
	let { id } = useParams();
	let group = groupsData.filter((data) => data.id == id);

	// Components

	return (
		<div>
			<h1>Group Home page</h1>
			<h1>{id}</h1>
			<GroupHeader groupId={id} group={group} />

		</div>
	);
};
