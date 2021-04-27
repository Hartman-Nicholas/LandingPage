// NPM Packages
import {Link} from 'react-router-dom'
import { About } from './About'
// Project files

export const GroupHeader = ({groupId}) => {
	// State

	// Constants

	// Components

	return (
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
	);
};
