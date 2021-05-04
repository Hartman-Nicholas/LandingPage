// NPM Packages
import ReactTimeAgo from "react-time-ago";
import { useState} from "react";
import { useRecoilValue } from "recoil";

// Project files
import { userDataState } from "../../state/userDataState";
import { EditCommentForm } from "./EditCommentForm";

export const CommentCard = ({
	data: { id, body, userCommentOwner, created, updated },handleDelete
}) => {
	// State
	const [toggler, setToggler] = useState(false);
	const { name: userInSession } = useRecoilValue(userDataState);
	const [commentBody, setCommentBody] = useState(body);

	// Constants
	const handleUpdate = (updatedComment) => {
		setCommentBody(updatedComment);
		setToggler(false);
	};
	// Components

	return (
		<div>
			{!toggler && (
				<>
					<h3>{commentBody}</h3>
					<h3>By: {userCommentOwner}</h3>
					{userCommentOwner === userInSession && (
						<>
						<button onClick={() => setToggler(true)}>Edit</button>
						<button onClick={() => handleDelete(id)}>Delete</button>
						</>
					)}
					{created ? "Created: " : "Last updated: "}
					<ReactTimeAgo
						date={new Date(created ? created : updated)}
						locale="en-US"
					/>
				</>
			)}
			{toggler && (
				<>
					<EditCommentForm
						data={commentBody}
						onSubmit={handleUpdate}
						commentId={id}
					/>
					<button onClick={() => setToggler(false)}>Close</button>
				</>
			)}
		</div>
	);
};
