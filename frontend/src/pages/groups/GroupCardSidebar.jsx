// NPM Packages
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

// Project files
import { userDataState } from "../../state/userDataState";

export const GroupCardSidebar = ({ groupData, joinGroup, leaveGroup }) => {
  // State
  const [userData, setUserData] = useRecoilState(userDataState);
  const [groupMembers] = useState(groupData.members);

  // Constants
  const handleClick = (e) => {
    e.preventDefault();
    leaveGroup(groupData.id);
    let filteredGroup = userData.groupsJoined.filter(
      (group) => group.id !== groupData.id
    );
    setUserData({ ...userData, groupsJoined: filteredGroup });
  };

  // const background_image = {
  //   backgroundImage: `url(${groupData?.avatar})`,
  //   backgroundPosition: "center",
  //   backgroundSize: "cover",
  //   backgroundRepeat: "no-repeat",
  //   maxWidth: "100%",
  //   maxHeight: "100%",
  // };
  // const [style, setStyle] = useState('');
  // const windowWidth = window.innerWidth;

  // useEffect(() => {
  // 	windowWidth > 1025
  //   ? { ...background_image, backgroundImage: "none !important" }
  //   : { ...background_image };
  // 	// return () => {
  // 	// 	cleanup
  // 	// }
  // }, [style])

  // const style =
  //   windowWidth > 1025
  //     ? { ...background_image, backgroundImage: "none !important" }
  //     : { ...background_image };

  return (
    <div className="sidebar-list">
      <div className="sidebar danger-btn">
        {groupData.groupOwner !== userData.name &&
          groupMembers.includes(userData.name) && (
            <i class="fas fa-sign-out-alt" title="Leave Group" onClick={handleClick}>
            </i>
          )}
      </div>
      <Link to={`/groups/${groupData.id}/home`}>
        {/* <div className="sidebar-group-list" style={{ ...style }}> */}
        <div className="sidebar-group-list">
          <div className="sidebar-image">
            <img
              src={groupData.avatar}
              alt="group"
              style={{
                objectFit: "contain",
              }}
            />
          </div>
          <div className="sidebar-text">
            <h2 className="itemTitle"> {groupData.title}</h2>
          </div>
        </div>
      </Link>

      {/* <div>
        {groupData.groupOwner !== userData.name &&
          !groupMembers.includes(userData.name) && (
            <button name="join" onClick={() => joinGroup(groupData.id)}>
              Join Group
            </button>
          )}
      </div> */}
    </div>
  );
};
