import React from "react";
import { Link } from "react-router-dom";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";

import Auth from "../../services/Auth";

const required = (value) => (value ? undefined : "Required");

const focusOnError = createDecorator();

export default function LoginForm() {
  const onSubmit = ({ email, password }) => {
    login({ email, password });
  };

  async function login(loginData) {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
    }
  }

  return (
    <Form
      className="loginForm"
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      subscription={{
        submitting: true,
      }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form className="loginForm__form" onSubmit={handleSubmit}>
          <h2 className="loginForm__form--title">Sign in</h2>
          <Field
            className="input-field"
            name="email"
            placeholder={"Email"}
            validate={required}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-envelope"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            className="input-field"
            name="password"
            placeholder={"Password"}
            validate={required}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-lock"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <input
            className="btn"
            value="Login"
            type="submit"
            disabled={pristine || submitting}
          />
          <FormSpy subscription={{ submitSucceeded: true, values: true }}>
            {({ submitSucceeded }) => {
              if (submitSucceeded) {
                return <Link to="/" />;
              }
              return <div></div>;
            }}
          </FormSpy>
                      
        </form>
      )}
    </Form>
  );
}
