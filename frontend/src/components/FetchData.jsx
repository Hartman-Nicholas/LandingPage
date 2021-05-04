// NPM Packages
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { Link } from "react-router-dom";

// Project files
import { getUserData, getGroupsList } from "../state/recoilFetch";
import { userDataState, groupDataState } from "../state/userDataState";

export const UserData = () => {
	// State
	const { data } = useRecoilValue(getUserData);
	const [userData, setUserData] = useRecoilState(userDataState);
	// Constants
console.log("here", userData)
console.log("data", data)
	// Components
useEffect(() => {
	setUserData(data)
},[])


	return <></>;
};

export const GroupData = () => {
	// State
	const { data } = useRecoilValue(getGroupsList);
	const [groupData, setGroupData] = useRecoilState(groupDataState);

	useEffect(() => {
		setGroupData(data);
	}, []);
	const list = groupData.map((group) => {
		return (
			<Link
				to={{
					pathname: `/groups/${group.id}`,
				}}
				key={group.id}
			>
				<div>
					<h1>{group.title}</h1>
				</div>
			</Link>
		);
	});

	return <div>{list.length === 0 ? "Groups list is empty" : list}</div>;
};
