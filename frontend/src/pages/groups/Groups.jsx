// NPM Packages
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
// Project files
import { GroupCard } from "./GroupCard";
import { OwnerGroupsBar } from "./group-details/OwnerGroupBar";
import { userDataState } from "../../state/userDataState";

import GroupApi from "../../api/GroupApi";

export const Groups = () => {
	// State
	const [groupsList, setGroupsList] = useState([]);
	const [userData, setUserData] = useRecoilState(userDataState);
	// Constants
	const addMember = async (groupId) => {
		await GroupApi.joinGroup(groupId).then(({ data }) => {
			let updatedGroupsList = groupsList.filter(
				(group) => group.id !== data.id
			);
			setGroupsList(updatedGroupsList);
			let userGroups = userData.groupsJoined.concat(data);
			setUserData({ ...userData, groupsJoined: userGroups });
		});
	};

	useEffect(() => {
		const groupList = async () => {
			await GroupApi.getAllGroups().then(({ data }) => setGroupsList(data));
		};
		groupList();
	}, [userData.groupsJoined]);

	// Components

	return (
		<div>
			<h1>All Groups</h1>

			{groupsList.length === 0
				? "No groups available"
				: groupsList.map((group) => (
						<GroupCard
							key={group.id}
							groupData={group}
							joinGroup={(id) => addMember(id)}
						/>
				  ))}

			<OwnerGroupsBar />
		</div>
	);
};
