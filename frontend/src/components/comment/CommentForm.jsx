// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";
import {useParams} from 'react-router-dom'

// Project files
import { postDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";
import CommentsApi from "../../api/CommentsApi";


export const CommentForm = ({postId}) => {
	// State
	const [commentForm, setCommentForm] = useState({
		body: "",
	});
	const [postData, setPostData] = useRecoilState(postDataState);
	let { id } = useParams();
	// Constants
	async function createComment(commentData) {
		try {
			await CommentsApi.createComment(postId, commentData);
			GroupApi.getGroupById(id)
				.then(({ data }) => setPostData(data.posts))
				.catch((err) => console.error(err));
		} catch (e) {
			console.error(e);
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCommentForm({
			...commentForm,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		setCommentForm({body: ""})
		createComment(commentForm);
		e.preventDefault();
	};
	// Components

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				value={commentForm.body}
				onChange={handleChange}
				placeholder="write a comment..."
				type="text"
				name="body"
				required
        maxLength= "255"
			/>
			<button type="submit">Submit</button>
		</form>
	);
};
