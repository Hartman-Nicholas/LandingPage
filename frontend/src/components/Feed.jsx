//NPM packages
import { useState, useEffect } from "react";

//Project files
import UserApi from "../api/UserApi";
import PostsApi from "../api/PostsApi";
import { PostCard } from "../components/post/postCard";
import LandingPage from "../pages/home/LandingPage";

export default function Feed() {
  const [userFeed, setUserFeed] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchUserFeed = async () => {
      await UserApi.userFeed().then(({ data }) => setUserFeed(data));
    };
    fetchUserFeed();
  }, [flag]);

  const deletePost = async (postId) => {
    try {
      await PostsApi.deletePost(postId).then(() => setFlag(true));
    } catch (e) {
      console.error(e);
    }
  };

  let stream =
    (userFeed === undefined || userFeed.length) === 0 ? (
      <LandingPage />
    ) : (
      userFeed?.map((feed) => (
        <PostCard key={feed.id} data={feed} handleDelete={deletePost} />
      ))
    );
  return (
    <div className="center">
      <div className="centerWrapper">{stream}</div>
    </div>
  );
}
