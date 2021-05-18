// NPM Packages
import { Link, useLocation } from "react-router-dom";

//Project files
import { useEffect, useState } from "react";

export default function Header({ onLogout }) {
  const [home, setHome] = useState(false);
  const [groups, setGroups] = useState(false);
  const [profile, setProfile] = useState(false);

  const location = useLocation();

  const regex = /[0-9]/g;
  const arrayId = location.pathname.match(regex);
  const groupId = arrayId?.reduce(function (previous, current) {
    return previous + current;
  }, "");

  // const user =

  useEffect(() => {
    const handleSelect = () => {
      switch (location.pathname) {
        case "/":
          setGroups(false);
          setProfile(false);
          setHome(true);
          break;
        case "/groups":
          setGroups(true);
          setProfile(false);
          setHome(false);
          break;
        case "/groups/create":
          setGroups(true);
          setProfile(false);
          setHome(false);
          break;
        case `/groups/${groupId}/home`:
          setGroups(true);
          setProfile(false);
          setHome(false);
          break;
        case "/user":
          setGroups(false);
          setProfile(true);
          setHome(false);
          break;

        default:
          break;
      }
    };

    handleSelect();
  }, [groupId, location.pathname]);

  // Components

  return (
    <nav className="header">
      <ul className="header__list">
        <li className={`header__list--item ${home ? "activeNav" : ""}`}>
          <Link to="/">
            <i name="home" className="fas fa-rocket"></i>
            <div className="header__list--title" name="home">
              Home
            </div>
          </Link>
        </li>

        <li className={`header__list--item ${groups ? "activeNav" : ""}`}>
          <Link to="/groups">
            <i name="groups" className="fas fa-globe-europe"></i>
            <div className="header__list--title" name="groups">
              Groups
            </div>
          </Link>
        </li>
        <li className={`header__list--item ${profile ? "activeNav" : ""}`}>
          <Link to="/user">
            <i name="profile" className="fas fa-user-astronaut"></i>
            <div className="header__list--title" name="profile">
              Profile
            </div>
          </Link>
        </li>

        <li className="header__list--item">
          <div onClick={onLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>

          <div className="header__list--title">Logout</div>
        </li>
      </ul>
    </nav>
  );
}
