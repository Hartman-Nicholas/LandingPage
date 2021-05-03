// NPM Packages

// Project files
import { About } from "./About";
import { Discussion } from "./Discussion";
import { Members } from "./Members";

export const GroupHeader = ({
	group,
	handleSubmit,
	aboutState,
	discussionState,
	membersState,
}) => {
	// State

	return (
		<div>
			<button name="about" onClick={handleSubmit}>
				About{" "}
			</button>
			<button name="discussion" onClick={handleSubmit}>
				Discussion{" "}
			</button>
			<button name="members" onClick={handleSubmit}>
				Members{" "}
			</button>
			{aboutState && <About data={group} />}
			{discussionState && <Discussion data={group} />}
			{membersState && <Members data={group} />}
		</div>
	);
};
