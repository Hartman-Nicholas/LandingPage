import React from "react";

import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";
import { Link } from "react-router-dom";
import checkPassStrength from "../../utils/passwordCheck";
import validateEmails from "../../utils/validateEmails";

import Auth from "../../services/Auth";
import UserApi from "../../api/UserApi";

const required = (value) => (value ? undefined : "Required");
const emailCheck = (value) => {
  return validateEmails(value || "");
};

const emailExistsCheck = async (value) => {
  const exists = await UserApi.emailExists(value)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (exists) {
    return "Email already exists";
  }
};

const userCheck = async (value) => {
  const exists = await UserApi.userNameExists(value)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  if (exists) {
    return "User already exists";
  }
};

const passCheck = (value) => {
  switch (checkPassStrength(value || "")) {
    case "Too Weak":
      return "Too Weak";
    default:
      return;
  }
};

const showPassStrength = (value) => {
  switch (checkPassStrength(value || "")) {
    case "Too Weak":
      return;
    case "weak":
      return "weak";
    case "good":
      return "good";
    case "strong":
      return "strong";
    default:
      return;
  }
};

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
const focusOnError = createDecorator();

export default function RegisterForm() {
  //Registeration state:

  const onSubmit = async (values) => {
    await Auth.register(values);
  };

  return (
    <Form
      className="registerForm"
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      subscription={{
        submitting: true,
      }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form className="registerForm__form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>
          <Field
            className="input-field"
            name="name"
            placeholder={"User Name"}
            validate={composeValidators(required, userCheck)}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-user"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && (
                  <div className="input-field-error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field
            className="input-field"
            name="email"
            placeholder={"Email"}
            validate={composeValidators(required, emailCheck, emailExistsCheck)}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-envelope"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && (
                  <div className="input-field-error">{meta.error}</div>
                )}
              </div>
            )}
          </Field>
          <Field
            className="input-field"
            name="password"
            placeholder={"Password"}
            validate={composeValidators(required, passCheck)}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i className="fas fa-lock"></i>
                <input {...input} placeholder={placeholder} />
                {meta.valid && <span>{showPassStrength(input.value)}</span>}
                {meta.error && meta.touched && (
                  <div className="input-field-error">{meta.error}</div>
                )}
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
