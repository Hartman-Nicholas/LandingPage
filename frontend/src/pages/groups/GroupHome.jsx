// NPM Packages
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";

// Project files
import { userDataState } from "../../state/userDataState";
import { GroupHeader } from "./group-details/GroupHeader";
import GroupApi from "../../api/GroupApi";
import UserApi from "../../api/UserApi";

export const GroupHome = () => {
  // State
  const { id } = useParams();
  const [groupData, setGroupData] = useState([]);
  const [userData, setUserData] = useRecoilState(userDataState);

  const [aboutState, setAboutState] = useState(false);
  const [discussionState, setDiscussionState] = useState(true);
  const [membersState, setMembersState] = useState(false);
  const history = useHistory();

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

  const handleDelete = async () => {
    const confirmBox = window.confirm(
      "Deleting a Group is irreversible!! Please confirm you would like to continue."
    );
    if (confirmBox) {
      await GroupApi.deleteGroup(id);
      await UserApi.getUser()
        .then(({ data }) => setUserData(data))
        .then(history.push("/"));
    }
  };

  return (
    <div className="groupHome">
      <div>
        {groupData.groupOwner === userData.name && (
          <div>
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
            <div className="groupHome--delete">
              <i onClick={handleDelete} className="fas fa-trash-alt"></i>
            </div>
          </div>
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
