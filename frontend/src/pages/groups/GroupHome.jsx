// NPM Packages
import { useEffect, useState } from "react";
import { useParams } from "react-router";

// Project files
import { GroupHeader } from "./group-details/GroupHeader";
import GroupApi from "../../api/GroupApi";
import {About} from "./group-details/About";
export const GroupHome = () => {
  // State
	const { id } = useParams();
	const [groupData, setGroupData] = useState([]);

	const [aboutState, setAboutState] = useState(false);
	const [discussionState, setDiscussionState] = useState(true);
	const [membersState, setMembersState] = useState(false);

	useEffect(() => {
		const groupsData = async () => {
			await GroupApi.getGroupById(id).then(({ data }) => setGroupData(data));
		};
		groupsData();
	}, [id, aboutState, discussionState, membersState]);

  // Variables

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
    <div className="gridContainer">
      <div className="center">
        <GroupHeader
          group={groupData}
          handleSubmit={handleSubmit}
          aboutState={aboutState}
          discussionState={discussionState}
          membersState={membersState}
        />
      </div>
      <div className="rightBar">
        <About />
		{/* TODO render Member component after BE fixes */}
		{/* <Members /> */}
      </div>
    </div>
  );
};
