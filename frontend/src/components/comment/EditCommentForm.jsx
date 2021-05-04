// NPM Packages
import { useState } from "react";

// Project files
import CommentsApi from "../../api/CommentsApi";

export const EditCommentForm = ({ data, onSubmit }) => {
	// State
	const [commentForm, setCommentForm] = useState({
		body: data.body,
	});

	// Constants
	async function commentUpdate(commentId, commentData) {
		try {
			await CommentsApi.updateComment( commentId,commentData).then(({data: {body}}) =>
				onSubmit(body)

			);
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
		commentUpdate(data.id, commentForm);
		setCommentForm({ body: "" });
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
				maxLength="255"
			/>
			<button type="submit">Submit</button>
		</form>
	);
};
