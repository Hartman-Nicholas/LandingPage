// NPM Packages
import { useState, useEffect } from "react";
import {useRecoilValue} from 'recoil'
import ReactTimeAgo from "react-time-ago";
// Project files
import { CommentCard } from "../comment/CommentCard";
import { CommentForm } from "../comment/CommentForm";
import {userDataState} from "../../state/userDataState"
import { EditPostForm } from "./EditPostForm";


export const PostCard = ({ data }) => {
	// State
	const [commentsData, setCommentsData] = useState(data.comments);
	const [toggler, setToggler] = useState(false)
	const user = useRecoilValue(userDataState);

	useEffect(() => {
		setCommentsData(data.comments ? data.comments : []);
	}, [data.comments]);
console.log(toggler)
	// Constants
	const handleSubmit = (newComment) => {
		const list = commentsData.concat(newComment);
		setCommentsData(list);
	};

	const handleUpdate = updatedPost => {
		data.body = updatedPost;
		setToggler(false);
	}
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
		{
			!toggler &&
			<div>
				<h1>{data.body}</h1>
				<h3>{data.postOwner}</h3>
				Created: <ReactTimeAgo date={new Date(data.created)} locale="en-US" />
				{data.postOwner === user.name &&
				<>
					<button onClick={()=> setToggler(true)}>Edit</button>
					{commentList}
					<CommentForm postId={data.id} onSubmit={handleSubmit} />
				</>
			}

			</div>
		}

			{
				toggler &&
				<EditPostForm data={data} onSubmit={handleUpdate} />
			}
		</div>
	);
};
