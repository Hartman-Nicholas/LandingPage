// NPM Packages
import { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { GroupHome } from "../groups/GroupHome";

// Project files

export const GroupCard = ({ groupData }) => {
  const [groupToggle, setGroupToggle] = useState(false);

  return (
    <div className="groupCard">
      <input
        type="radio"
        value="test"
        name="test"
        id={groupData.id}
        className="groupCard__radio"
        onClick={() => setGroupToggle(!groupToggle)}
      ></input>
      <label htmlFor={groupData.id}>
        <h1>Group: {groupData.title}</h1>
        <h2>Group Description: {groupData.description}</h2>
        <h3>Admin : {groupData.groupOwner}</h3>
        Created:{" "}
        <ReactTimeAgo date={new Date(groupData.created)} locale="en-US" />
      </label>
      <div className="hidden">
        <GroupHome groupData={groupData} />
      </div>
    </div>
  );
};
