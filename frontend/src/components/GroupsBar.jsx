// NPM Packages
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";

// Project files
import { GroupData, UserData } from "./FetchData";
import { ErrorMessage } from "./ErrorMessage";

export const GroupsBar = () => {
	// State

	// Constants

	// Components
	return (
		<div>
			<Link to="/groups/create">Create a group</Link>
			<ErrorBoundary FallbackComponent={ErrorMessage}>
				<Suspense fallback={<div>loading...</div>}>
					<UserData />
					<GroupData />
				</Suspense>
			</ErrorBoundary>
			<Link to="/groups">Join a new group</Link>
		</div>
	);
};
