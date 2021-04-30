// NPM Packages
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {useState} from 'react'
// Project files
import { About } from "./About";
import { Discussion } from "./Discussion";
import { Members } from "./Members";
import { ErrorMessage } from "../../../components/ErrorMessage";

export const GroupHeader = ({ groupId, group }) => {
	// State
const [aboutState, setAboutState] = useState(false)
const [discussionState, setDiscussionState] = useState(true)
const [MembersState, setMembersState] = useState(false)
	// Constants

	// Components
const handleSubmit = (e) => {
	switch (e.target.name) {
		case "about":
			setAboutState(true)
			setDiscussionState(false)
			setMembersState(false)
			break;
			case "discussion":
			setAboutState(false)
			setDiscussionState(true)
			setMembersState(false)
			break;
			case "members":
			setAboutState(false)
			setDiscussionState(false)
			setMembersState(true)
			break;
		default:
			break;
	}
}


	return (
		<div>
			<button  name="about"  onClick={handleSubmit}>About </button>
			<button name="discussion"  onClick={handleSubmit}>Discussion </button>
			<button  name="members" onClick={handleSubmit}>Members </button>
			{aboutState && <About data={group}/>}
			{discussionState && <Discussion  data={group}/>}
			{MembersState && <Members  data={group} />}
		</div>

		// <Router>
		// 	<nav>
		// 		<div>
		// 			<ul>
		// 				<li>
		// 					<Link to={`/groups/${groupId}/about`}>About</Link>
		// 				</li>

		// 				<li>
		// 					<Link to={`/groups/${groupId}/discussion`}>Discussion</Link>
		// 				</li>

		// 				<li>
		// 					<Link to={`/groups/${groupId}/members`}>Members</Link>
		// 				</li>
		// 			</ul>
		// 		</div>
		// 	</nav>
		// 	<ErrorBoundary FallbackComponent={ErrorMessage}>
		// 		<Suspense fallback={<div>loading...</div>}>
		// 			<Switch>
		// 				<Route
		// 					path="/groups/:id/about"
		// 					exact
		// 					render={(props) => (
		// 						<About key={props.match.params.id} groupData={group} />
		// 					)}
		// 				/>
		// 				<Route
		// 					path="/groups/:id/discussion"
		// 					exact
		// 					render={(props) => <Discussion key={props.match.params.id} />}
		// 				/>
		// 				<Route
		// 					path="/groups/:id/members"
		// 					exact
		// 					render={(props) => (
		// 						<Members key={props.match.params.id} groupData={group} />
		// 					)}
		// 				/>
		// 			</Switch>
		// 		</Suspense>
		// 	</ErrorBoundary>
		// </Router>
	);
};
