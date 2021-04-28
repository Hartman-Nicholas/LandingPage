// NPM Packages
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Project files
import { groupDataState, userDataState } from "../../../state/userDataState";

export const Members = ({ groupData }) => {
	// State
	console.log("fromMembers", groupData);
	// Constants

	// Components

	return <h1>Members List</h1>;
};
