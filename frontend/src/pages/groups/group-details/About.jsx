// NPM Packages
import ReactTimeAgo from "react-time-ago";

// Project files

export const About = ({ data }) => {
	// State

	// Constants

	const allDetails = data && (
		<div>
			<h3>{data.description}</h3>
			<h3>rules: {data.rules}</h3>
			<h4>admin: {data.groupOwner}</h4>
			<h4>
				Topics:{" "}
				{data.topics.map((topic) => (
					<p key={topic.id}>{topic}</p>
				))}
			</h4>
			<p>
				<ReactTimeAgo date={new Date(data.created)} locale="en-US" />
			</p>
		</div>
	);
	// Components
	return (
		<div>
			{allDetails}
		</div>
	);
};
