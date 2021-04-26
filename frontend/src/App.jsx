// NPM Packages
import { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// Project files
import Auth from "./services/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./pages/auth/AuthPage";
import Home from "./pages/home/HomePage";
import User from "./pages/user/UserPage";

import "./styles/App.css";

export default function App() {
  // State
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());

  // Constants
  Auth.bindLoggedInStateSetter(setLoggedIn);

  // Components
  return (
    <div className="container">
      <RecoilRoot>
        <BrowserRouter>
          <Header onLogout={() => Auth.logout()} loggedIn={loggedIn} />
          <Switch>
            {!loggedIn && <AuthPage />}
            <Route path="/" exact component={Home} />
            <Route path="/user" exact component={User} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}
