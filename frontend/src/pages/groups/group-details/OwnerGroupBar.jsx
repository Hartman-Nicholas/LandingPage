import { Link } from "react-router-dom";
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
      <Link to={`/groups/${group.id}/home`}>
        <div>
          <ul className="list">
            <li className="listItem">
              <div className="listItemContent">
                <div className="sidebarItemText">
                  <h2>{group.title}</h2>
                 
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Link>
    );
	}): "no groups has been created yet";

	return <div>your groups:{list.length === 0 ? "Groups list is empty" : list}</div>;
};
