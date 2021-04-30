// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import { groupDataState } from "../../state/userDataState";
import PostApi from "../../api/PostsApi";
import GroupApi from "../../api/GroupApi";

export const PostForm = ({ groupId }) => {
	// State
	const [postForm, setPostForm] = useState({
		body: "",
	});
	const [groupData, setGroupData] = useRecoilState(groupDataState);
	// Constants
	async function createPost(requestBody) {
		try {
			await PostApi.createPost(groupId, requestBody);
		  await	GroupApi.getAllGroups()
				.then(({ data }) => setGroupData(data))
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
		e.preventDefault();
		createPost(postForm);
		setPostForm({ body: "" });
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
