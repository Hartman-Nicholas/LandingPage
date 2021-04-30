// NPM Packages
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

// Project files
import { PostCard } from "../../../components/post/postCard";
import { PostForm } from "../../../components/post/PostForm";
import { groupDataState, userDataState } from "../../../state/userDataState";
export const Discussion = ({ data }) => {
	// State
	const [postData, setPostData] = useState(data.posts);
	// const groupData = useRecoilValue(groupDataState)
	// console.log("userData", groupData)
	// Constants
	console.log("data", data);
	const handleSubmit = (newPost) => {
		console.log("before", newPost);
		const list = postData.concat(newPost);
		setPostData(list);
	};

	// let filteredList = groupData.filter(group => group.id == data.id)
	// let group = filteredList[0].posts;
	// console.log("goru",group)
	// Components
	let postsList =
		postData.length === 0
			? "No Available posts"
			: postData.map((post) => <PostCard key={post.id} data={post} />);

	return (
		<div>
			<h1>Discussion</h1>
			<PostForm
				groupId={data.id}
				onSubmit={handleSubmit}

			/>
			{postsList}
		</div>
	);
};
