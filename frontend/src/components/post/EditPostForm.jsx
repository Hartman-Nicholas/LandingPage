// NPM Packages
import { useState } from "react";

// Project files
import PostApi from "../../api/PostsApi";
import {ImageUploader} from '../ImageUploader'

export const EditPostForm = ({ data, onSubmit, postId, photo }) => {
	// State
	const [ imageUrl,setImageUrl] = useState(photo)
	const [postForm, setPostForm] = useState({
		body: data
	});
console.log("dataEdit", postForm)
	// Constants
	async function postUpdate(id, requestBody) {
		try {
			console.log("req", requestBody)
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
		// postForm.photo = imageUrl
		console.log("postF", postForm)
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
			<input name="photo" defaultValue="hi there"/>
			<button type="submit">Save</button>
		</form>
	);
};
