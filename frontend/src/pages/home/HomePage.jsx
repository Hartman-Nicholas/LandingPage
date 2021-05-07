// NPM Packages

// Project files
import Feed from "../../components/Feed";

import UserPosts from "../../components/UserPosts";

export default function Home() {
  return (
    <>
      <div className="gridRight">
        <Feed />
        <UserPosts />
      </div>
    </>
  );
}
