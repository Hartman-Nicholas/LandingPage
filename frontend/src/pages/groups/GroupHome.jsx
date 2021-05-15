// NPM Packages
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

// Project files
import { userDataState } from "../../state/userDataState";
import { GroupHeader } from "./group-details/GroupHeader";
import GroupApi from "../../api/GroupApi";

export const GroupHome = () => {
  // State
  const { id } = useParams();
  const [groupData, setGroupData] = useState([]);
  const { name: userInSession } = useRecoilValue(userDataState);

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
    switch (e.target.getAttribute("name")) {
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

  console.log(groupData);

  return (
    <div className="groupHome">
      <div>
        {groupData.groupOwner === userInSession && (
          <Link
            to={{
              pathname: "./edit",
              state: {
                fromNotifications: { groupData },
              },
            }}
          >
            <div className="groupHome--edit">
              <i className="fas fa-edit"></i>
            </div>
          </Link>
        )}

        <GroupHeader
          group={groupData}
          handleSubmit={handleSubmit}
          aboutState={aboutState}
          discussionState={discussionState}
          membersState={membersState}
        />
      </div>
    </div>
  );
};
