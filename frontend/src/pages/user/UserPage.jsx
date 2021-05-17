// NPM Packages
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Project files
import { ErrorMessage } from "../../components/ErrorMessage";
import { OwnerGroupsBar } from "../groups/group-details/OwnerGroupBar";
import UserCard from "./UserCard";

export default function User() {
	return (
    <div className="gridRight">
      <div className="center">
        <ErrorBoundary FallbackComponent={ErrorMessage}>
          <Suspense fallback={<div>loading...</div>}>
            <ul className="list">
              <li className="listItem">
                <UserCard />
              </li>
            </ul>
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="rightBar">
            <OwnerGroupsBar />
      </div>
    </div>
  );
}
