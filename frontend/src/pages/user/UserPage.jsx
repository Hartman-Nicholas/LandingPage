import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../components/ErrorMessage";

import UserCard from "./UserCard";

export default function User() {
  return (
    <section>
      <div>User Template</div>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <Suspense fallback={<div>loading...</div>}>
          <UserCard />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
