import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Link } from "react-router-dom";

// Project files
import { getUserData } from "../../../state/recoilFetch";
import { userDataState} from "../../../state/userDataState";

export const OwnerGroupsBar = () => {
    // State

    // const { data } = useRecoilValue(getGroupsList);
    const userData  = useRecoilValue(userDataState);
    console.log("owner",userData)
    // Constants

    // Components


    const list = userData.groupsCreated.map((group) => {
      return (
        <Link
          to={{
            pathname: `/groups/${group.id}`,
          }}
          key={group.id}
        >
          <div>
            <h1>{group.title}</h1>
          </div>
        </Link>
      );
    });

    return <div>{list.length === 0 ? "Groups list is empty" : list}</div>;
  };
