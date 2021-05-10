import { Link } from "react-router-dom";

export default function Footer({ loggedIn }) {
  return (
    <footer className="foot-bar">
      <div>
        <h3>Write to us</h3>
        <a href="mailto:communityimmigrant@.co.se">
          {" "}
          communityimmigrant@gmail.com{" "}
        </a>
        {loggedIn && (
          <div>
            <Link className="home-link" to="/groups">
              <button className="home-button">Go to Your Groups</button>
            </Link>
            <Link className="home-link" to="/about">
              <button className="home-button">About</button>
            </Link>
            <p>THIS IS THE OFFICIAL SITE OF SWEDEN</p>
            <p>Copyright © 2021-2021 Novare Potential</p>
          </div>
        )}
      </div>
    </footer>
  );
}
