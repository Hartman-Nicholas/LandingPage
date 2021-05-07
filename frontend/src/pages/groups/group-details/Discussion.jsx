// NPM Packages
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userDataState } from "../../../state/userDataState";

// Project files
import PostsApi from "../../../api/PostsApi";
import { PostCard } from "../../../components/post/postCard";
import { PostForm } from "../../../components/post/PostForm";

export const Discussion = ({ data }) => {
  // State
  const [postData, setPostData] = useState(data.posts);
  const [userData, setUserData] = useRecoilState(userDataState);

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
    setUserData({
      ...userData,
      posts: userData.posts.concat(newPost),
    });
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
          <PostCard
            key={post.id}
            data={post}
            handleDelete={handleDelete}
            groupOwner={data.groupOwner}
          />
        ));

  return (
    <div>
      <h1>Discussion</h1>
      <PostForm groupId={data.id} onSubmit={handleSubmit} />
      {postsList}
    </div>
  );
};
