// NPM Packages
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
// Project files
import { About } from "./About";
import { Discussion } from "./Discussion";
import { Members } from "./Members";
import { ErrorMessage } from "../../../components/ErrorMessage";

export const GroupHeader = ({ groupId, group }) => {
	// State

	// Constants

	// Components

	return (
		<Router>
			<nav>
				<div>
					<ul>
						<li>
							<Link to={`/groups/${groupId}/about`}>About</Link>
						</li>

						<li>
							<Link to={`/groups/${groupId}/discussion`}>Discussion</Link>
						</li>

						<li>
							<Link to={`/groups/${groupId}/members`}>Members</Link>
						</li>
					</ul>
				</div>
			</nav>
			<ErrorBoundary FallbackComponent={ErrorMessage}>
				<Suspense fallback={<div>loading...</div>}>
					<Switch>
						<Route
							path="/groups/:id/about"
							exact
							render={(props) => (
								<About key={props.match.params.id} groupData={group} />
							)}
						/>
						<Route
							path="/groups/:id/discussion"
							exact
							render={(props) => <Discussion key={props.match.params.id} />}
						/>
						<Route
							path="/groups/:id/members"
							exact
							render={(props) => (
								<Members key={props.match.params.id} groupData={group} />
							)}
						/>
					</Switch>
				</Suspense>
			</ErrorBoundary>
		</Router>
	);
};
