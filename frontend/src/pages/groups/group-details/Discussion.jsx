// NPM Packages
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Project files
import { PostCard } from "../../../components/post/postCard";
import { PostForm } from "../../../components/post/PostForm";
import { groupDataState } from "../../../state/userDataState";

export const Discussion = () => {
	// State
	const groupsList = useRecoilValue(groupDataState);
	let { id } = useParams();
	// Constants
let groupQuery = groupsList.filter(group => group.id == id);

	// Components

	return (
		<div>
			<h1>Discussion</h1>
			<PostForm groupId={id} />
			{groupQuery[0].posts.length === 0
				? "No available posts yet"
				: groupQuery[0].posts.map((post) => {
						return <PostCard key={post.id} data={post} />;
				  })}
		</div>
	);
};
