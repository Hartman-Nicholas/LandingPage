// NPM Packages
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userDataState } from "../state/userDataState";
//Project files
import { useState } from "react";

export default function Header({ onLogout }) {
  const [userData] = useRecoilState(userDataState);

  const [home, setHome] = useState(false);
  const [groups, setGroups] = useState(false);
  const [profile, setProfile] = useState(false);

  const handleSelect = (e) => {
    switch (e.target.getAttribute("name")) {
      case "home":
        setGroups(false);
        setProfile(false);
        setHome(true);
        break;
      case "groups":
        setGroups(true);
        setProfile(false);
        setHome(false);
        break;
      case "profile":
        setGroups(false);
        setProfile(true);
        setHome(false);
        break;

      default:
        break;
    }
  };

  // Components

  return (
    <nav className="header">
      <ul className="header__list">
        <li
          onClick={handleSelect}
          className={`header__list--item ${home ? "activeNav" : ""}`}
        >
          <Link to="/">
            <i name="home" className="fas fa-rocket"></i>
            <div
              className="header__list--title"
              name="home"
              onClick={handleSelect}
            >
              Home
            </div>
          </Link>
        </li>

        <li
          onClick={handleSelect}
          className={`header__list--item ${groups ? "activeNav" : ""}`}
        >
          <Link to="/groups">
            <i name="groups" className="fas fa-globe-europe"></i>
            <div
              className="header__list--title"
              name="groups"
              onClick={handleSelect}
            >
              Groups
            </div>
          </Link>
        </li>
        <li
          onClick={handleSelect}
          className={`header__list--item ${profile ? "activeNav" : ""}`}
        >
          <Link to="/user">
            <i name="profile" className="fas fa-user-astronaut"></i>
            <div
              className="header__list--title"
              name="profile"
              onClick={handleSelect}
            >
              {userData.name}
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
