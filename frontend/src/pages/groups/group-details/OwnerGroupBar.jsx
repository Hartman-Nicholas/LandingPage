import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'
// Project files
import UserApi from "../../../api/UserApi";

export const OwnerGroupsBar = () => {
	// State
	const [userData, setUserData] = useState([])
	// Constants

	// Components
useEffect(() => {
	UserApi.getUser().then(({data}) => setUserData(data))
}, [])

	const list = (userData.groupsCreated) ? userData.groupsCreated.map((group) => {
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
	}): "no data";

	return <div>your groups:{list.length === 0 ? "Groups list is empty" : list}</div>;
};
