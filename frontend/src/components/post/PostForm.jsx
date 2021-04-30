// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";
import GroupApi from "../../api/GroupApi";

// Project files
import PostApi from "../../api/PostsApi";
import UserApi from "../../api/UserApi";
import { groupDataState, userDataState } from "../../state/userDataState";

export const PostForm = ({ groupId, onSubmit }) => {
	// State
	const [postForm, setPostForm] = useState({
		body: "",
	});
	const [resData, setResData] = useState({})
	// const [groupData,setGroupData] = useRecoilState(groupDataState)
	// Constants
	async function createPost(requestBody) {
		try {
			await PostApi.createPost(groupId, requestBody)
			.then((res) => setResData(res.data) );
			// await GroupApi.getAllGroups().then(({data})=> setGroupData(data))
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
		onSubmit(resData);
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
