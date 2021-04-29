// NPM Packages
import React, { useState } from "react";

// Project files
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../assets/logoLandingPage.png";
import searchImg from "../../assets/search.svg";
import socialImg from "../../assets/social.svg";

export default function LoginPage() {
  const [signIn, setSignIn] = useState(false);

  return (
    <section className="authPage">
      <div className="authPage--blueWave"></div>
      <div className="authPage__headingSection">
        <img className="authPage--logo" src={logo} alt="Bird Flying"></img>
        <h1 className="authPage--MainHeading">Landing Page</h1>
      </div>

      {signIn && (
        <div className="authPage__form">
          <div className="authPage__form__switch">
            <h2 className="authPage__form__switch--title">New here?</h2>
            <button
              className="btn transparent"
              type="button"
              onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
            >
              Sign Up
            </button>
          </div>
          <LoginForm />
          <div className="authPage__form--imgContainer">
            <img
              className="authPage__form--img"
              src={searchImg}
              alt="Lady sitting on a moon searching the internet"
            ></img>
          </div>
        </div>
      )}
      {!signIn && (
        <div className="authPage__form">
          <div className="authPage__form__switch">
            <h2 className="authPage__form__switch--title">One of us?</h2>
            <button
              className="btn transparent"
              type="button"
              onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
            >
              Sign In
            </button>
          </div>
          <RegisterForm />
          <div className="authPage__form--imgContainer">
            <img
              className="authPage__form--img"
              src={socialImg}
              alt="Lady and man sitting and interacting"
            ></img>
          </div>
        </div>
      )}
      <div className="authPage--yellowWave"></div>
    </section>
  );
}
