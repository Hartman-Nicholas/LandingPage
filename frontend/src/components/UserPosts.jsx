import { useRecoilState } from "recoil";
import { userDataState } from "../../src/state/userDataState";
import { PostCard } from "./post/postCard";

export default function UserPosts() {
  const [userData, setUserData] = useRecoilState(userDataState);
  
  console.log({userData});
  
  const userPosts = userData?.posts?.map((post) => <PostCard key = {post.id} data={post} />) || [];

  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        {userPosts}
      </div>
    </div>
  );
}
