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
      <div>
        <div className="groupHome--avatar-container">
          <img className="groupHome--avatar" src={group.avatar} alt="group" />
        </div>

        <h2 className="groupHome--heading">{group.title}</h2>
      </div>
      <div className="groupHome__labels">
        <div
          className={
            aboutState
              ? "groupHome__labels--item active"
              : "groupHome__labels--item"
          }
          name="about"
          onClick={handleSubmit}
        >
          <i class="fas fa-info-circle"></i>
          About
        </div>
        <div
          className={
            discussionState
              ? "groupHome__labels--item active"
              : "groupHome__labels--item"
          }
          name="discussion"
          onClick={handleSubmit}
        >
          <i class="fas fa-comment-dots"></i>
          Discussion
        </div>
        <div
          className={
            membersState
              ? "groupHome__labels--item active"
              : "groupHome__labels--item"
          }
          name="members"
          onClick={handleSubmit}
        >
          <i class="fas fa-users"></i>
          Members
        </div>
      </div>

      {aboutState && <About data={group} />}
      {discussionState && <Discussion data={group} />}
      {membersState && <Members data={group} />}
    </div>
  );
};
