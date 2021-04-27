// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import { postDataState } from "../../state/userDataState";
import PostApi from "../../api/PostsApi";
import GroupApi from "../../api/GroupApi";

export const PostForm = ({ groupId }) => {
	// State
	const [postForm, setPostForm] = useState({
		body: "",
	});
	const [postData, setPostData] = useRecoilState(postDataState);
	// Constants
	async function createPost(postData) {
		try {
			await PostApi.createPost(groupId, postData);
			GroupApi.getGroupById(groupId)
				.then(({ data }) => setPostData(data.posts))
				.catch((err) => console.error(err));
		} catch (e) {
			console.error(e);
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPostForm({
			...postForm,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		createPost(postForm);
		setPostForm({ body: "" });
		e.preventDefault();
	};
	// Components

	return (
		<form onSubmit={handleSubmit}>
			<textarea
				value={postForm.body}
				onChange={handleChange}
				placeholder="what's on your mind..."
				type="text"
				name="body"
				required
				maxLength="255"
			/>
			<button type="submit">Submit</button>
		</form>
	);
};
