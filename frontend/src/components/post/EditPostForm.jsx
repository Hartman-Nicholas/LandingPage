// NPM Packages
import { useState } from "react";

// Project files
import PostApi from "../../api/PostsApi";
import {ImageUploader} from '../ImageUploader'

export const EditPostForm = ({ data, onSubmit, postId }) => {
	// State
	const [ imageUrl,setImageUrl] = useState(data.photo)
	const [postForm, setPostForm] = useState({
		body: data.body,
		photo: data.photo
	});
	// Constants
	async function postUpdate(id, requestBody) {
		try {
			await PostApi.updatePost(id, requestBody).then(({ data: { body, photo } }) =>
				onSubmit({body, photo})
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
		postForm.photo = imageUrl
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
			<img src={imageUrl} alt="post"/>
			  <ImageUploader setImageState={setImageUrl} />
			<button type="submit">Save</button>
		</form>
	);
};
