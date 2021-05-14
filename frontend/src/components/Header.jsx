// NPM Packages
import { Link } from "react-router-dom";
//Project files
import logo from "../assets/logoLandingPage.png";

export default function Header({ onLogout, loggedIn }) {
  // Components

  return (
    <nav>
      <div className="flexbox-container">
        <ul>
          {loggedIn && (
            <li>
              <Link to="/">
                <img
                  className="logo"
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "70px",
                    height: "50px",
                    borderRadius: "8px",
                  }}
                />
              </Link>
              <ul className="headerBar">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/groups">Groups</Link>
                </li>
                <li>
                  <Link to="/user">Profile</Link>
                </li>
              </ul>

              <button className="logout" type="button" onClick={onLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
