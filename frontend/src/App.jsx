// NPM Packages
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

// Project files
import Auth from "./services/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/auth/AuthPage";
import Home from "./pages/home/HomePage";
import User from "./pages/user/UserPage";
import { ErrorMessage } from "./components/ErrorMessage";

import "./styles/App.css";
import { Groups } from "./pages/groups/Groups";
import { GroupsBar } from "./components/GroupsBar";
import { GroupHome } from "./pages/groups/GroupHome";
import { GroupForm } from "./pages/groups/GroupForm";
import { GroupEdit } from "./pages/groups/GroupEdit";
import GuideLines from "./components/GuideLines";

export default function App() {
  // State
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());

  // Constants
  Auth.bindLoggedInStateSetter(setLoggedIn);

  // Components

  return (
    <RecoilRoot>
      <BrowserRouter>
        <div className={loggedIn ? "" : "beforeContainer"}>
          <Header onLogout={() => Auth.logout()} loggedIn={loggedIn} />
          <section
            className={loggedIn ? "" : "container"}
            id={loggedIn ? "grid" : ""}
          >
            {loggedIn && (
              <ErrorBoundary FallbackComponent={ErrorMessage}>
                <Suspense fallback={<div>loading...</div>}>
                  <GroupsBar />
                </Suspense>
              </ErrorBoundary>
            )}

            <Switch>
              {!loggedIn && <AuthPage />}
              <Route path="/" exact component={Home} />
              <Route path="/user" exact component={User} />
              <Route path="/guidelines" exact component={GuideLines} />
              <Route path="/groups/create" exact component={GroupForm} />
              <Route path="/groups" exact component={Groups} />
              <Route path="/groups/:id/home" exact component={GroupHome} />

              <Route path="/groups/:id/edit" exact component={GroupEdit} />
            </Switch>
          </section>
          {loggedIn && <Footer loggedIn={loggedIn} />}
        </div>
      </BrowserRouter>
    </RecoilRoot>
  );
}
