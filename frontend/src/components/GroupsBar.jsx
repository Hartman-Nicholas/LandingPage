// NPM Packages
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";

// Project files

import { getUserData } from "../state/recoilFetch";
import { userDataState } from "../state/userDataState";
import { GroupCard } from "../pages/groups/GroupCard";
import UserApi from "../api/UserApi";

export const GroupsBar = () => {
	// State
	const { data } = useRecoilValue(getUserData);
	const [userData, setUserData] = useRecoilState(userDataState);
	// Constants

	// Components
	const groupsJoined = data.groupsJoined.map((group) => {
		return <GroupCard key={group.id} groupData={group} />;
	});

	const groupCreated = data.groupsCreated.map((group) => {
		return <GroupCard key={group.id} groupData={group} />;
	});

	useEffect(() => {
		setUserData(data);
	}, []);

	return (
		<div>
			<Link to="/groups/create">Create a group</Link>
			<h2>Groups joined :</h2>
			{groupsJoined}
			<h2>Groups Created: </h2>
			{groupCreated}
			<br />
			<Link to="/groups">Join a new group</Link>
		</div>
	);
};
