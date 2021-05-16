import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

// Project files
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../state/userDataState";

export const OwnerGroupsBar = () => {
  // State

  const owner = useRecoilValue(userDataState);

  // Constants

  // Components

  const list = owner.groupsCreated
    ? owner.groupsCreated.map((group) => {
        return (
          <div className="userCreatedGroups">
            <div className="userCreatedGroups__grid">
              <Link to={`/groups/${group.id}/home`}>
                <h3 className="userCreatedGroups--itemTitle">{group.title}</h3>
                <div className="userCreatedGroups--img-container">
                  <img
                    className="userCreatedGroups--img"
                    src={group.avatar}
                    alt="group"
                  />
                </div>

                <div className="userCreatedGroups--author-text">
                  <span>
                    <ReactTimeAgo
                      date={new Date(group.created)}
                      locale="en-US"
                    />
                  </span>
                  <span>{group.members.length} members</span>
                </div>

                <div className="userCreatedGroups--description">
                  {" "}
                  {group.description}
                </div>
              </Link>
            </div>
          </div>
        );
      })
    : "no groups has been created yet";

  return (
    <div>
      {" "}
      Groups You Created ({list.length})
      {list.length === 0 ? "Groups list is empty" : list}{" "}
    </div>
  );
};
