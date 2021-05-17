// NPM Packages
import { useState, useEffect } from "react";
import { MemberCard } from "./MemberCard";

// Project files

export const Members = ({ data, status }) => {
  // State
  const [membersList, setMembersList] = useState(data?.members);

  useEffect(() => {
    setMembersList(data.members);
  }, [status, data.id]);
  // Constants
  //TODO update after BE fixes the members array data
  let list =
    membersList.length === 0 ? (
      <div></div>
    ) : (
      membersList?.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))
    );

  // Components

  return (
    <div className="membersPage">
      <h2 className="membersPage--heading">
        This Group has {membersList.length} members
      </h2>
      {list}
    </div>
  );
};
