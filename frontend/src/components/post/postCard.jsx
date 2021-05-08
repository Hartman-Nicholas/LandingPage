// NPM Packages
import { useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
// Project files
import { CommentCard } from "../comment/CommentCard";
import { CommentForm } from "../comment/CommentForm";

export const PostCard = ({ data }) => {
	// State
	const [commentsData, setCommentsData] = useState(data.comments);

	useEffect(() => {
		setCommentsData(data.comments ? data.comments : []);
	}, [data.comments]);

	// Constants
	const handleSubmit = (newComment) => {
		const list = commentsData.concat(newComment);
		setCommentsData(list);
	};

	// Components

	let commentList =
		(commentsData === null || commentsData.length === 0)
			? "No Available comments"
			: commentsData?.map((comment) => (
					<CommentCard key={comment.id} data={comment} />
			  ));
	return (
		<div>
			{/* TODO update the return so it doesnt have duplicated data */}
			<h1>{data.body}</h1>
			<h3>{data.postOwner}</h3>
			Created: <ReactTimeAgo date={new Date(data.created)} locale="en-US" />
			{commentList}
			<CommentForm postId={data.id} onSubmit={handleSubmit} />
		</div>
	);
};
