import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userDataState } from "../../state/userDataState";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";
import { Link, useHistory } from "react-router-dom";

import UserApi from "../../api/UserApi";
import { ImageUploader } from "../../components/ImageUploader";

export default function EditProfile({ setToggler }) {
  // State
  const [userData, setUserData] = useRecoilState(userDataState);
  const [imageUrl, setImageUrl] = useState(userData.avatar);

  // Constants

  const history = useHistory();
  const required = (value) => (value ? undefined : "Required");

  const emailExistsCheck = async (value) => {
    if (value === userData.email) {
      return;
    }
    const exists = await UserApi.emailExists(value.toLowerCase())
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (exists) {
      return "Email already exists";
    }
  };

  const composeValidators =
    (...validators) =>
    (value) =>
      validators.reduce(
        (error, validator) => error || validator(value),
        undefined
      );
  const focusOnError = createDecorator();

  // input validation
  const userNameExists = async (value) => {
    if (value.toLowerCase() === userData.name) {
      return;
    }
    const exists = await UserApi.userNameExists(value)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    if (exists) {
      return "User Name already exists. Please choose other name.";
    }
  };

  const onSubmit = async (values) => {
    try {
      values.avatar = imageUrl;
      const response = await UserApi.updateUser(values);

      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
    setToggler(false);
  };

  // Components
  return (
    <div>
      <h2>Edit Profile</h2>
      <Form
        onSubmit={onSubmit}
        decorators={[focusOnError]}
        subscription={{
          submitting: true,
        }}
      >
        {({ handleSubmit, form, submitting, pristine }) => (
          <form
            onSubmit={(event) => {
              const promise = handleSubmit(event);
              if (promise === undefined) {
              } else {
                promise.then(() => {
                  form.reset();
                });
              }
              return promise;
            }}
          >
            <div className="custom-file-upload">
              <img
                className="img-wrap img-upload"
                src={imageUrl}
                alt="User Avatar"
              />
            </div>
            <div className="groupForm--upload">
              <ImageUploader setImageState={setImageUrl} />
            </div>
            <Field
              name="name"
              defaultValue={userData.name}
              placeholder="User Name"
              validate={composeValidators(required, userNameExists)}
            >
              {({ input, meta, placeholder }) => (
                <div className="form--input">
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && (
                    <div className="input-field-error">{meta.error}</div>
                  )}
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>User Name</label>
                </div>
              )}
            </Field>
            <Field
              name="email"
              defaultValue={userData.email}
              placeholder="email"
              validate={composeValidators(required, emailExistsCheck)}
            >
              {({ input, meta, placeholder }) => (
                <div className="form--input">
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && (
                    <div className="input-field-error">{meta.error}</div>
                  )}
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Email</label>
                </div>
              )}
            </Field>
            <Field
              defaultValue={userData.bio}
              name="bio"
              placeholder="User bio"
              validate={composeValidators(required)}
            >
              {({ input, meta, placeholder }) => (
                <div className="form--input">
                  <textarea rows="5" {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && (
                    <div className="input-field-error">{meta.error}</div>
                  )}
                  <span class="highlight"></span>
                  <span class="bar"></span>
                  <label>Bio</label>
                </div>
              )}
            </Field>
            <div className="form--submitEdit">
              <button onClick={() => setToggler(false)} className="btn-cancel">
                Cancel
              </button>

              <input
                className="btn-blue"
                value="Update Profile"
                type="submit"
                disabled={pristine || submitting}
              />
            </div>
            <FormSpy subscription={{ submitSucceeded: true, values: true }}>
              {({ submitSucceeded }) => {
                if (submitSucceeded) {
                  history.push(`/user`);
                  return <Link to="/" />;
                }
                return <div></div>;
              }}
            </FormSpy>
                        
          </form>
        )}
      </Form>
    </div>
  );
}
