import React, { useState } from "react";

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

const userCheck = async (value) => {
  console.log(value);
  const exists = await UserApi.userNameExists(value)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  console.log(exists);

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
  const [isSuccessful, setIsSuccessful] = useState(true);

  console.log(isSuccessful);

  const onSubmit = (values) => {
    register(values);
  };

  async function register(registrationData) {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      setIsSuccessful(false);
    }
  }

  return (
    <Form
      onSubmit={onSubmit}
      decorators={[focusOnError]}
      subscription={{
        submitting: true,
      }}
    >
      {({ handleSubmit, submitting, pristine }) => (
        <form onSubmit={handleSubmit} className="sign-up-form">
          <h2 className="title">Sign up</h2>
          <Field
            name="name"
            placeholder={"User Name"}
            validate={(required, userCheck)}
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
                  <span className="red-text" style={{ marginBottom: "20px" }}>
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <Field
            name="email"
            placeholder={"Email"}
            validate={composeValidators(required, emailCheck)}
          >
            {({ input, meta, placeholder }) => (
              <div
                className={`field ${
                  meta.active ? "active input-field" : "input-field"
                }`}
              >
                <i class="fas fa-envelope"></i>
                <input {...input} placeholder={placeholder} />
                {meta.error && meta.touched && (
                  <span className="red-text" style={{ marginBottom: "20px" }}>
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <Field
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
                  <span className="red-text" style={{ marginBottom: "20px" }}>
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <input
            className="btn solid"
            value="Login"
            type="submit"
            disabled={pristine || submitting}
          />
          <FormSpy subscription={{ submitSucceeded: true, values: true }}>
            {({ submitSucceeded }) => {
              if (submitSucceeded) {
                return <Link to="/" />;
              }
              return <div>Hi There</div>;
            }}
          </FormSpy>
                      
        </form>
      )}
    </Form>
  );
}
