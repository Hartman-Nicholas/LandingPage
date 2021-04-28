// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { useParams,Switch,Route, BrowserRouter } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Project files
import { groupDataState, userDataState } from "../../state/userDataState";
import { About } from "./group-details/About";
import { Discussion } from "./group-details/Discussion";
import { Members } from "./group-details/Members";
import { GroupHeader } from "./group-details/GroupHeader";

export const GroupHome = () => {
	// State
	const groupsData = useRecoilValue(groupDataState);

	// Variables
	let { id } = useParams();
	let group = groupsData.filter((data) => data.id == id);

	// Components

	return (
		<div>
			<h1>Group Home page</h1>
			<h1>{id}</h1>
			<BrowserRouter>
			<GroupHeader groupId={id} />
			<Switch>
				<Route path="/groups/:id/about" exact render={() => <About  groupData={group}/>} />
				<Route path="/groups/:id/discussion" exact render={() => <Discussion  groupData={group}/>} />
				<Route path="/groups/:id/members" exact render={() => <Members  groupData={group}/>} />
			</Switch>
			</BrowserRouter>
		</div>
	);
};
