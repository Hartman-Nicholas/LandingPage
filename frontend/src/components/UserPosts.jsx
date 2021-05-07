import { useRecoilValue } from "recoil";
import { userDataState } from "../../src/state/userDataState";
import { PostCard } from "./post/postCard";

export default function UserPosts() {
  const userData = useRecoilValue(userDataState);

  const userPosts = userData?.posts?.map((post) =>
            <PostCard data={post}/>)
|| [];

  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        Right Bar Template
        {userData?.posts?.map((post) => (
          <PostCard data={post}/>
        ))}
      </div>
    </div>
  );
}
