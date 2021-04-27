// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import { postDataState } from "../../state/userDataState";
import PostApi from "../../api/PostsApi";
import CommentsApi from "../../api/CommentsApi";


export const CommentForm = ({postId}) => {
	// State
	const [commentForm, setCommentForm] = useState({
		body: "",
	});
	const [postData, setPostData] = useRecoilState(postDataState);
	// const [groupData, setGroupData] = useRecoilState(postDataState);

	// Constants
	async function createComment(commentData) {
		try {
			await CommentsApi.createComment(postId, commentData);
			PostApi.getAllPosts()
				.then(({ data }) => setPostData(data))
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

	const handleSubmit = async (e) => {
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
