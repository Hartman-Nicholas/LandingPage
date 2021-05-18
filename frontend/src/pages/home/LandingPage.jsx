//NPM pacakges
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="homePage">
      <h1 className="homePage--heading">Welcome to Landing Page.</h1>
      <h2 className="homePage--welcome">
        A community forum setup to help you get started with your life in a new
        country
      </h2>

      <h3 className="homePage--subHeading">Getting Started</h3>
      <ul className="homePage__list">
        <li className="homePage__list--item">
          Head on over to the{" "}
          <Link className="homePage--links" to="/user">
            user profile
          </Link>{" "}
          page and setup your Avatar, and Bio. Tell us a bit about your journey?
        </li>
        <li className="homePage__list--item">
          Check out our{" "}
          <Link className="homePage--links" to="/guidelines">
            community guidelines
          </Link>
          . This is what makes our community so great.
        </li>
        <li className="homePage__list--item">
          Your privacy is important to us read our{" "}
          <Link className="homePage--links" to="/privacy">
            Privacy Policy
          </Link>{" "}
          which hilights the measure we take to keep your personal information
          safe.
        </li>
        <li className="homePage__list--item">
          All updated and read up? Time to head over to
          <Link className="homePage--links" to="/groups">
            {" "}
            Join a new group
          </Link>{" "}
          and start to take part in the community.
        </li>
        <li className="homePage__list--item">
          Didn't find what you where looking for? Why not{" "}
          <Link className="homePage--links" to="/groups/create">
            create your own group
          </Link>{" "}
          and get the community talking?
        </li>
      </ul>
    </div>
  );
}
