// NPM Packages
import { useEffect, useState } from "react";

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

	const handleSubmit = (newPost) => {
		const list = postData.concat(newPost);
		setPostData(list);
	};

	// Components
	let postsList =
		(postData === undefined || postData.length) === 0
			? "No Available posts"
			: postData?.map((post) => <PostCard key={post.id} data={post} />);

	return (
		<div>
			<h1>Discussion</h1>
			<PostForm groupId={data.id} onSubmit={handleSubmit} />
			{postsList}
		</div>
	);
};
