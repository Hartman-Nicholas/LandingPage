// NPM Packages
import { useState } from "react";

// Project files
import PostApi from "../../api/PostsApi";

export const EditPostForm = ({ data, onSubmit, postId }) => {
	// State
	const [postForm, setPostForm] = useState({
		body: data,
	});

	// Constants
	async function postUpdate(id, requestBody) {
		try {
			await PostApi.updatePost(id, requestBody).then(({ data: { body } }) =>
				onSubmit(body)
			);
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
		postUpdate(postId, postForm);
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
			<button type="submit">Save</button>
		</form>
	);
};
