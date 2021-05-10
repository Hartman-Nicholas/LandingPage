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
          </div>
        )}
      </div>
    </footer>
  );
}
