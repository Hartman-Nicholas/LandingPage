import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Project files
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../state/userDataState";

export const OwnerGroupsBar = () => {
	// State
	const ownerData = useRecoilValue(userDataState)
	const [owner, setOwner] = useState({})
	useEffect(()=> {
		setOwner(ownerData)
		return () => setOwner({})
	},[])
	// Constants

	// Components


	const list = (owner.groupsCreated) ? owner.groupsCreated.map((group) => {
		return (
			<Link
				to={{
					pathname: `/groups/${group.id}`,
				}}
				key={group.id}
			>
				<div>
					<h1>{group.title}</h1>
					<h4>{group.description}</h4>
				</div>
			</Link>
		);
	}): "no groups has been created yet";

	return <div>your groups:{list.length === 0 ? "Groups list is empty" : list}</div>;
};
