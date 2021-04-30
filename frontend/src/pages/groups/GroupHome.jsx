// NPM Packages

// Project files
import { GroupHeader } from "./group-details/GroupHeader";

export const GroupHome = ({ groupData }) => {
  // State

  // Variables

  // Components

  return (
    <div className="groupHome">
      <h1>{groupData.title}</h1>
      <h1>{groupData.id}</h1>
      <GroupHeader group={groupData} />
    </div>
  );
};
