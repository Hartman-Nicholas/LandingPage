// NPM Packages

// Project files
import Feed from "../../components/Feed";
import RightBar from "../../components/RightBar";

export default function Home() {
  return (
    <>
      <div className="gridRight">
        <Feed />
        <RightBar />
      </div>
    </>
  );
}
