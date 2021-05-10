// NPM Packages
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import ReactTimeAgo from "react-time-ago";
// Project files
import { CommentCard } from "../comment/CommentCard";
import { CommentForm } from "../comment/CommentForm";
import { userDataState } from "../../state/userDataState";
import { EditPostForm } from "./EditPostForm";
import CommentsApi from "../../api/CommentsApi";
import PostsApi from "../../api/PostsApi";

export const PostCard = ({
	data: {
		id,
		comments,
		body,
		postOwner,
		created,
		postLikes,
		postDislikes,
		updated,
	},
	handleDelete,
	groupOwner,
}) => {
	// State
	const [commentsData, setCommentsData] = useState(comments);
	const [postBody, setPostBody] = useState(body);
	const [toggler, setToggler] = useState(false);
	const { name: userInSession } = useRecoilValue(userDataState);
	const [commentToggler, setCommentToggler] = useState(false);
	const [likeToggler, setLikeToggler] = useState();
	const [dislikeToggler, setDislikeToggler] = useState();
	const [likesCount, setLikesCount] = useState(postLikes?.length);
	const [dislikeCount, setDislikeCount] = useState(postDislikes?.length);

	useEffect(() => {
		setCommentsData(comments ? comments : []);

		const likeStatus = async () => {
			await PostsApi.checkLikePost(id).then(({ data }) => setLikeToggler(data));
		};

		const dislikeStatus = async () => {
			await PostsApi.checkDislikePost(id).then(({ data }) =>
				setDislikeToggler(data)
			);
		};

		likeStatus();
		dislikeStatus();
	}, [comments, id]);
	//TODO fix like-dislike handlers

	// Constants
	const handleSubmit = (newComment) => {
		const list = commentsData.concat(newComment);
		setCommentsData(list);
	};

	const deleteComment = async (commentId) => {
		try {
			await CommentsApi.deleteComment(commentId);
		} catch (e) {
			console.error(e);
		}
	};

	const handleLike = () => {
		if (likeToggler) {
			setLikesCount(postLikes?.length - 1);
			deleteLikePost();
			setLikeToggler(false);
		} else {
			likePost();
			setLikesCount(postLikes?.length + 1);
			setLikeToggler(true);
			if (dislikeToggler) {
				setDislikeCount(postDislikes?.length - 1);
				setLikesCount(postLikes?.length + 1);
				deleteDislikePost();
				setDislikeToggler(false);
			}
		}
	};

	const likePost = async () => {
		try {
			await PostsApi.likePost(id).then(({ data }) => setLikeToggler(data));
		} catch (e) {
			console.error(e);
		}
	};

	const deleteLikePost = async () => {
		try {
			await PostsApi.deletelikePost(likeToggler.id);
		} catch (e) {
			console.error(e);
		}
	};

	const handleDislike = () => {
		if (dislikeToggler) {
			setDislikeCount(postDislikes?.length - 1);
			deleteDislikePost();
			setDislikeToggler(false);
		} else {
			setDislikeCount(postDislikes?.length + 1);
			dislikePost();
			setDislikeToggler(true);
			if (likeToggler) {
				setDislikeCount(postDislikes?.length - 1);
				setLikesCount(postLikes?.length + 1);
				deleteLikePost();
				setLikeToggler(false);
			}
		}
	};

	const dislikePost = async () => {
		try {
			await PostsApi.dislikePost(id).then(({ data }) =>
				setDislikeToggler(data)
			);
		} catch (e) {
			console.error(e);
		}
	};

	const deleteDislikePost = async () => {
		try {
			await PostsApi.deleteDislikePost(dislikeToggler.id);
		} catch (e) {
			console.error(e);
		}
	};

	const handleUpdate = (updatedPost) => {
		setPostBody(updatedPost);
		setToggler(false);
	};

	const handleCommentDelete = (DeletedCommentId) => {
		deleteComment(DeletedCommentId);
		const filteredList = commentsData.filter(
			(comment) => comment.id !== DeletedCommentId
		);
		setCommentsData(filteredList);
	};
	// Components
	let commentList =
		commentsData === null || commentsData.length === 0
			? "No Available comments"
			: commentsData?.map((comment) => (
					<CommentCard
						key={comment.id}
						data={comment}
						handleDelete={handleCommentDelete}
						groupOwner={groupOwner}
					/>
			  ));
	return (
		<div>
			{!toggler && (
				<div>
					<h3>{postOwner}</h3>
					<h1>{postBody}</h1>
					<h3>{likesCount}</h3>
					<h3>{dislikeCount}</h3>
					<div>
						{created ? "Created: " : "Last updated: "}
						<ReactTimeAgo
							date={new Date(created ? created : updated)}
							locale="en-US"
						/>
					</div>
					{likeToggler ? (
						<div>
							<i onClick={handleLike} className="fas fa-thumbs-up"></i>
						</div>
					) : (
						<div>
							<i onClick={handleLike} className="far fa-thumbs-up"></i>
						</div>
					)}

					{dislikeToggler ? (
						<div>
							<i onClick={handleDislike} className="fas fa-thumbs-down"></i>
						</div>
					) : (
						<div>
							<i onClick={handleDislike} className="far fa-thumbs-down"></i>
						</div>
					)}

					{postOwner === userInSession && (
						<>
							<button onClick={() => setToggler(true)}>Edit</button>
						</>
					)}
					{groupOwner | (postOwner === userInSession) && (
						<i
							onClick={() => handleDelete(id)}
							className="fas fa-trash-alt"
						></i>
					)}

					<div>
						<i
							onClick={() => setCommentToggler(!commentToggler)}
							className="fas fa-comments"
						></i>
					</div>

					{commentToggler && (
						<>
							{commentList}
							<CommentForm postId={id} onSubmit={handleSubmit} />
						</>
					)}
				</div>
			)}

			{toggler && (
				<>
					<EditPostForm data={postBody} onSubmit={handleUpdate} postId={id} />
					<button onClick={() => setToggler(false)}>Close</button>
				</>
			)}
		</div>
	);
};
