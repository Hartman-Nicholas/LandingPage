// NPM Packages
import ReactTimeAgo from "react-time-ago";

// Project files

export const About = ({ data }) => {
  // State

  // Constants

  const allDetails = data && (
    <div>
      <div className="aboutPage">
        <p>Description:</p>
        <p>{data.description}</p>
        <p>Rules:</p>
        <p>{data.rules}</p>
        <p>Topics:</p>
        <p>
          {data.topics.map((topic) => (
            <p key={topic.id}>{topic}</p>
          ))}
        </p>
        <p>Created:</p>
        <p>
          <ReactTimeAgo date={new Date(data.created)} locale="en-US" />
        </p>
        <p>Owner:</p>
        <p>{data.groupOwner}</p>
      </div>
    </div>
  );
  // Components
  return <div>{allDetails}</div>;
};
