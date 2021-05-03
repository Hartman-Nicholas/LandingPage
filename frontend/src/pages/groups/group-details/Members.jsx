// NPM Packages
import { useState, useEffect } from "react";
import { MemberCard } from "./MemberCard";

// Project files

export const Members = ({ data, status }) => {
	// State
	const [membersList, setMembersList] = useState(data?.members);
console.log("membersList", membersList)
	useEffect(() => {
		setMembersList(data.members);
	}, [status, data.id]);
	// Constants
	//TODO update after BE fixes the members array data
	let list =
		membersList.length === 0
			? <h3>No available members</h3>
			: membersList?.map((member) => (
					<MemberCard key={member.id} member={member} />
			  ));

	// Components

	return <div>{list}</div>;
};
