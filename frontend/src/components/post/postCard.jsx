// NPM Packages
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import ReactTimeAgo from "react-time-ago";
// Project files
import { CommentCard } from "../comment/CommentCard";
import { CommentForm } from "../comment/CommentForm";
import { userDataState } from "../../state/userDataState";
import { EditPostForm } from "./EditPostForm";

export const PostCard = ({
	data: { id, comments, body, postOwner, created },
}) => {
	// State
	const [commentsData, setCommentsData] = useState(comments);
	const [postBody, setPostBody] = useState(body);
	const [toggler, setToggler] = useState(false);
	const { name: userInSession } = useRecoilValue(userDataState);

	useEffect(() => {
		setCommentsData(comments ? comments : []);
	}, [comments]);

	// Constants
	const handleSubmit = (newComment) => {
		const list = commentsData.concat(newComment);
		setCommentsData(list);
	};

	const handleUpdate = (updatedPost) => {
		setPostBody(updatedPost);
		setToggler(false);
	};
	// Components

	let commentList =
		commentsData === null || commentsData.length === 0
			? "No Available comments"
			: commentsData?.map((comment) => (
					<CommentCard key={comment.id} data={comment} />
			  ));
	return (
		<div>
			{/* TODO update the return so it doesnt have duplicated data */}
			{!toggler && (
				<div>
					<h1>{postBody}</h1>
					<h3>{postOwner}</h3>
					Created: <ReactTimeAgo date={new Date(created)} locale="en-US" />
					{postOwner === userInSession && (
						<button onClick={() => setToggler(true)}>Edit</button>
					)}
					{commentList}
					<CommentForm postId={id} onSubmit={handleSubmit} />
				</div>
			)}

			{toggler && (
				<>
					<EditPostForm data={postBody} onSubmit={handleUpdate} postId={id} />
					<button onClick={() => setToggler(false)}>Close</button>
				</>
			)}
		</div>
	);
};
