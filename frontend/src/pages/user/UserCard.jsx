import { useRecoilValue } from "recoil";
import { userDataState } from "../../state/userDataState";
export default function UserCard() {
	//TODO Fix user data isnt fetching
	const userData = useRecoilValue(userDataState);

	console.log(userData)
	// const userPosts = userData.posts.map((post) => {
	// 	return <PostCard key ={post.id} /> 
	// }
	// )

	return (
    <section>
        <div>UserCard Template</div>
        <div>{userData.name}</div>
        <div> {userData.email}</div>
        <div> {userData.bio}</div>
    </section>
  );
}
