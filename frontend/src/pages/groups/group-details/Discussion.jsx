// NPM Packages
import { useEffect, useState } from "react";
import PostsApi from "../../../api/PostsApi";

// Project files
import { PostCard } from "../../../components/post/postCard";
import { PostForm } from "../../../components/post/PostForm";

export const Discussion = ({ data }) => {
	// State
	const [postData, setPostData] = useState(data.posts);

	useEffect(() => {
		setPostData(data.posts);
	}, [data.posts]);

	// Constants
	const deletePost = async (postId) => {
		try {
			await PostsApi.deletePost(postId);
		} catch (e) {
			console.error(e);
		}
	};

	const handleSubmit = (newPost) => {
		const list = postData.concat(newPost);
		setPostData(list);
	};

	const handleDelete = (id) => {
		deletePost(id);
		const filteredList = postData.filter((post) => post.id !== id);
		setPostData(filteredList);
	};

	// Components
	let postsList =
		(postData === undefined || postData.length) === 0
			? "No Available posts"
			: postData?.map((post) => (
					<PostCard key={post.id} data={post} handleDelete={handleDelete} groupOwner={data.groupOwner} />
			  ));

	return (
		<div>
			<h1>Discussion</h1>
			<PostForm groupId={data.id} onSubmit={handleSubmit} />
			{postsList}
		</div>
	);
};
