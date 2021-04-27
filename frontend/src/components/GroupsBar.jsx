// NPM Packages
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {GroupData, UserData} from "./FetchData"

// Project files
import { ErrorMessage } from "./ErrorMessage";

export const GroupsBar = () => {
	// State

	// Constants

	// Components
	return (
		<ErrorBoundary FallbackComponent={ErrorMessage}>
			<Suspense fallback={<div>loading...</div>}>
				<UserData />
				<GroupData />
			</Suspense>
		</ErrorBoundary>
	);
};
