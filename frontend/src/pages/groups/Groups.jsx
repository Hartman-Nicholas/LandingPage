// NPM Packages
import { useRecoilValue } from "recoil";

// Project files
import { GroupCard } from "./GroupCard";
import { OwnerGroupsBar } from "./group-details/OwnerGroupBar";
import { useEffect, useState } from "react";
import GroupsApi from "../../api/GroupApi"

export const Groups = () => {
	// State
	const [groupsList, setGroupsList] = useState([])

	// Constants

useEffect(()=>{
	const groupList = async()=> {
		await GroupsApi.getAllGroups().then(({data})=> setGroupsList(data))
	}
	groupList()
},[])
	// Components

	return (
		<div>
			<h1>All Groups</h1>

			{groupsList.length === 0
				? "No groups available"
				: groupsList.map((group) => (
						<GroupCard key={group.id} groupData={group} />
				  ))}

			<OwnerGroupsBar />
		</div>
	);
};
