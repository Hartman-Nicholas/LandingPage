// NPM Packages
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

// Project files
import { getUserData, getGroupsList } from "../state/recoilFetch";
import { userDataState, groupDataState } from "../state/userDataState";

export const UserData = () => {
	// State
	const [userData, setUserData] = useRecoilState(userDataState);
	const { data } = useRecoilValue(getUserData);

	// Constants

	// Components
	useEffect(() => {
		const abortFetch = new AbortController();

		setUserData(data);

		return () => abortFetch.abort();
	}, []);

	return <div></div>;
};

export const GroupData = () => {
	// State
	const [groupData, setGroupData] = useRecoilState(groupDataState);
	const { data } = useRecoilValue(getGroupsList);
	// Constants

	// Components
	useEffect(() => {
		const abortFetch = new AbortController();
		setGroupData(data);

		return () => abortFetch.abort();
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
// fetch types:
// 0: groups
// 1: user
// export const FetchSwitch = ({ fetchType }) => {
// 	switch (fetchType) {
// 		case 0:
// 			// State
// 			const [groupData, setGroupData] = useRecoilState(groupDataState);
// 			const { data } = useRecoilValue(getGroupsList);

// 			console.log("user data From GroupData component", groupData);
// 			// Constants

// 			// Components
// 			useEffect(() => {
// 				let mount = true;
// 				if (mount) {
// 					setGroupData(data);
// 				}
// 				return () => {
// 					mount = false;
// 				};
// 			}, [setGroupData]);
// 			return groupData.map((group) => {
// 				return (
// 					<div key={group.id}>
// 						<h1>{group.title}</h1>
// 					</div>
// 				);
// 			});
// 		case 1:
// 			// State
// 			const [userData, setUserData] = useRecoilState(userDataState);
// 			const { data } = useRecoilValue(getUserData);

// 			console.log("user data From userData component", userData);
// 			// Constants
// 			// Components
// 			useEffect(() => {
// 				let mount = true;
// 				if (mount) {
// 					setUserData(data);
// 				}
// 				return () => {
// 					mount = false;
// 				};
// 			}, [setUserData]);

// 			return (
// 				<section>
// 					<div>UserCard Template</div>
// 					<div>{userData.name}</div>
// 					<div> {userData.email}</div>
// 				</section>
// 			);

// 		default:
// 			return <h1>...loading</h1>;
// 	}
// };
