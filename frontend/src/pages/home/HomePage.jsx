// NPM Packages

// Project files
import LeftBar from "../../components/LeftBar";
import Feed from "../../components/Feed";
import { GroupsBar } from "../../components/GroupsBar";
import RightBar from "../../components/RightBar";

export default function Home() {
  return (
    <>
      <div className="gridContainer">
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
