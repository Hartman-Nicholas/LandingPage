// NPM Packages
import ReactTimeAgo from "react-time-ago";

// Project files

export const CommentCard = ({ data }) => {
	// State

	// Constants

	// Components

	return (
		<div>
			<h3>{data.body}</h3>
			<h3>By: {data.userCommentOwner}</h3>
			Created: <ReactTimeAgo date={new Date(data.created)} locale="en-US" />
		</div>
	);
};
