// NPM Packages
import { useState } from "react";
// Project files
import { About } from "./About";
import { Discussion } from "./Discussion";
import { Members } from "./Members";

export const GroupHeader = ({ group }) => {
  // State
  const [aboutState, setAboutState] = useState(false);
  const [discussionState, setDiscussionState] = useState(true);
  const [MembersState, setMembersState] = useState(false);
  // Constants

  // Components
  const handleSubmit = (e) => {
    switch (e.target.name) {
      case "about":
        setAboutState(true);
        setDiscussionState(false);
        setMembersState(false);
        break;
      case "discussion":
        setAboutState(false);
        setDiscussionState(true);
        setMembersState(false);
        break;
      case "members":
        setAboutState(false);
        setDiscussionState(false);
        setMembersState(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button name="about" onClick={handleSubmit}>
        About{" "}
      </button>
      <button name="discussion" onClick={handleSubmit}>
        Discussion{" "}
      </button>
      <button name="members" onClick={handleSubmit}>
        Members{" "}
      </button>
      {aboutState && <About data={group}  />}
      {discussionState && <Discussion data={group} status={discussionState} />}
      {MembersState && <Members data={group} />}
    </div>
  );
};
