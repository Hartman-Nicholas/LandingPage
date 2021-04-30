// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import { groupDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";
import CommentsApi from "../../api/CommentsApi";


export const CommentForm = ({postId}) => {
	// State
	const [commentForm, setCommentForm] = useState({
		body: "",
	});
	const [groupData, setGroupData] = useRecoilState(groupDataState);
	// Constants
	async function createComment(commentData) {
		try {
			await CommentsApi.createComment(postId, commentData);
			await GroupApi.getAllGroups()
				.then(({ data }) => setGroupData(data))
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
		e.preventDefault();
		createComment(commentForm);
		setCommentForm({body: ""})
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
