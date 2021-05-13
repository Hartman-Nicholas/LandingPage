import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

// Project files
import { useRecoilValue } from "recoil";
import { userDataState } from "../../../state/userDataState";

export const OwnerGroupsBar = () => {
	// State

	const owner = useRecoilValue(userDataState)

	// Constants

	// Components

	const list = (owner.groupsCreated) ? owner.groupsCreated.map((group) => {

		return (
      <section className="group-grid container">
        <div className="group-container">
          <div className="group-image">
            <Link to={`/groups/${group.id}/home`}>
              <img
                src={group.avatar}
                alt="group"
                style={{
                  width: "95%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <p className="author-text">
            <span>
              <ReactTimeAgo date={new Date(group.created)} locale="en-US" />
            </span>
            <span>{group?.groupMembers?.length} members</span>
          </p>
          {/* <TagRow tags={groupData.topics} /> */}

          <h3 className="itemTitle">{group.title}</h3>

          <p className="description-text"> {group.description}</p>
        </div>
      </section>
    );
	}): "no groups has been created yet";

	return (
    <div>
      {" "}
      Groups You Created ({list.length}){list.length === 0
        ? "Groups list is empty"
        : list}{" "}
    </div>
  );
};
