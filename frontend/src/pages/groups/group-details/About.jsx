// NPM Packages
import { useParams} from "react-router-dom";
import { useRecoilValue } from "recoil";

// Project files
import { groupDataState, userDataState } from "../../../state/userDataState";

export const About = ({groupData}) => {
	// State

	// Constants

	// Components
	return (
		<div>
			<h1>about:</h1>
			{groupData.map((item) => {
				return <div key={item.id}>
					<h1>{item.description}</h1>
				</div>;
			})}
		</div>
	);
};
