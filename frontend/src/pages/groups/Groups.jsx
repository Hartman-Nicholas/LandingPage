// NPM Packages
import { useRecoilValue } from "recoil";

// Project files
import { GroupCard } from "./GroupCard";
import { OwnerGroupsBar } from "./group-details/OwnerGroupBar";
import { useEffect, useState } from "react";
import GroupsApi from "../../api/GroupApi";

export const Groups = () => {
  // State
  const [groupsList, setGroupsList] = useState([]);

  // Constants

  useEffect(() => {
    const groupList = async () => {
      await GroupsApi.getAllGroups().then(({ data }) => setGroupsList(data));
    };
    groupList();
  }, []);
  // Components

  return (
    <div className="gridRight" style={{display:"flex"}}>
        <section id="non-sidebar">
          {groupsList.length === 0
            ? "No groups available"
            : groupsList.map((group) => (
                <ul className="sidebarList">
                  <li className="sidebarListItem">
                    <GroupCard key={group.id} groupData={group} />
                  </li>
                </ul>
              ))}
        </section>
        <OwnerGroupsBar />
    </div>
  );
};
