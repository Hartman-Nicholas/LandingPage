// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
// Project files

export const GroupCard = ({ groupData }) => {

	return (
		<Link
			to={{
				pathname: `/groups/home`,
				state: {
					fromNotifications: { groupData },
				}
			}}
		>
			<h1>Group: {groupData.title}</h1>
			<h2>Group Description: {groupData.description}</h2>
			<h3>Admin : {groupData.groupOwner}</h3>
			Created:{" "}
			<ReactTimeAgo date={new Date(groupData.created)} locale="en-US" />
		</Link>
	);
};
