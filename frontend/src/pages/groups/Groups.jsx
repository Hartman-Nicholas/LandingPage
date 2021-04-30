// NPM Packages
import { useRecoilValue } from "recoil";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
// Project files
import { groupDataState, userDataState } from "../../state/userDataState";
import { GroupCard } from "./GroupCard";
import { OwnerGroupsBar } from "./group-details/OwnerGroupBar";
import { ErrorMessage } from "../../components/ErrorMessage";

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
			<ErrorBoundary FallbackComponent={ErrorMessage}>
				<Suspense fallback={<div>loading...</div>}>
					<OwnerGroupsBar />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};
