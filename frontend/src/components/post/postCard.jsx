// NPM Packages
import ReactTimeAgo from "react-time-ago";
// Project files
import { CommentCard } from "../comment/CommentCard";
import { CommentForm } from "../comment/CommentForm";

export const PostCard = ({ data }) => {
	// State

	// Constants

	// Components
	return (
		<div>
			{data && data.length === 0 ? (
				"No posts yet"
			) : (
				<div>
					<h3>{data.body}</h3>
					<h3>{data.postOwner}</h3>
					Created: <ReactTimeAgo date={new Date(data.created)} locale="en-US" />
					{data.comments.map((comment) => {
						return <CommentCard key={comment.id} data={comment} />;
					})}
					<CommentForm postId={data.id} />
				</div>
			)}
		</div>
	);
};
