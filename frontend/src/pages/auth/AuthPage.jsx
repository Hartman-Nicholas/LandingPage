// NPM Packages
import React, { useState } from "react";

// Project files
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginPage() {
  const [signIn, setSignIn] = useState(false);

  return (
    <section>
      {signIn && (
        <div>
          <LoginForm />
          <h2>Don't have an account?</h2>

          <button
            type="button"
            onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
          >
            Sign Up
          </button>
        </div>
      )}
      {!signIn && (
        <div>
          <RegisterForm />
          <h2>Already a user?</h2>
          <button
            type="button"
            onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
          >
            Sign In
          </button>
        </div>
      )}
    </section>
  );
}
