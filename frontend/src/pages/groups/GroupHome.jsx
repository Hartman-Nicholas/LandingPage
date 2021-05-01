// NPM Packages

// Project files
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GroupHeader } from "./group-details/GroupHeader";
import GroupApi from "../../api/GroupApi";

export const GroupHome = () => {
  const { id } = useParams();
  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    const groupData = async () => {
      await GroupApi.getGroupById(id).then(({ data }) => setGroupData(data));
    };
    groupData();
    return () => setGroupData([]);
  }, [id]);

  // State

  // Variables

  // Components

  return (
    <div>
      <h1>{groupData.title}</h1>
      <h1>{groupData.id}</h1>
      <GroupHeader group={groupData} />
    </div>
  );
};
