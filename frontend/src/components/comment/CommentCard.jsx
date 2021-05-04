// NPM Packages
import ReactTimeAgo from "react-time-ago";
import {useState, useEffect} from "react"
import {useRecoilValue} from 'recoil'

// Project files
import {userDataState} from "../../state/userDataState"
import { EditCommentForm } from "./EditCommentForm";

export const CommentCard = ({ data }) => {
	// State
	const [toggler, setToggler] = useState(false)
	const {name: userInSession} = useRecoilValue(userDataState);
	const [commentBody, setCommentBody] = useState(data.body)

	// useEffect(() => {
	// 	setCommentBody(data.body ? data.body : []);
	// }, [commentBody]);

	// Constants
const handleUpdate = updatedComment => {
	setCommentBody(updatedComment);
	setToggler(false);
}
	// Components

	return (
		<div>
			{
				!toggler &&
				<>
				<h3>{commentBody}</h3>
				<h3>By: {data.userCommentOwner}</h3>
				{data.userCommentOwner === userInSession &&
				<button onClick={()=> setToggler(true)}>Edit</button>
				}
				Created: <ReactTimeAgo date={new Date(data.created? data.created : data.updated)} locale="en-US" />
				</>
			}
			{
				toggler &&
<EditCommentForm data={data} onSubmit={handleUpdate}/>
			}
		</div>
	);
};
