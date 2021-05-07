import { Link } from "react-router-dom";
// Project files
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../state/userDataState";

export const OwnerGroupsBar = () => {
	// State
	const ownerData = useRecoilValue(userDataState)

	// Constants

	// Components


	const list = (ownerData.groupsCreated) ? ownerData.groupsCreated.map((group) => {
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
