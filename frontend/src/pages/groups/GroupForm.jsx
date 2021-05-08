// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";
import { Form, Field, FormSpy } from "react-final-form";
import createDecorator from "final-form-focus";
import { Link, useHistory } from "react-router-dom";

// Project files
import { userDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";
import UserApi from "../../api/UserApi";
import { ImageUploader } from "../../components/ImageUploader";

const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);
const focusOnError = createDecorator();

export const GroupForm = () => {
  //   State

  const [topicArray, setTopicArray] = useState([]);

  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dlvwrtpzq/image/upload/v1619987659/profilePhotos/placeholder_eo6jkp.png"
  );

  const history = useHistory();

  const [, setUserData] = useRecoilState(userDataState);
  const [group, setGroup] = useState({});

  const onCheck = (event) => {
    const indexTopic = topicArray.indexOf(event.target.value);
    const filterValue = topicArray[indexTopic];
    if (indexTopic >= 0) {
      const deleteTopic = topicArray.filter((item) => item !== filterValue);
      setTopicArray(deleteTopic);
    } else {
      setTopicArray([...topicArray, event.target.value]);
    }
  };

  const onSubmit = async (values) => {
    try {
      values.avatar = imageUrl;

      const group = await GroupApi.createGroup(values).then((res) => res.data);

      setGroup(group);

      topicArray.map(async (topic) => {
        await GroupApi.joinTopic(group.id, topic);
      });
      await UserApi.getUser().then(({ data }) => setUserData(data));
    } catch (e) {
      console.error(e);
    }
  };

  // Constants

  const groupNameExists = async (value) => {
    const exists = await GroupApi.checkGroupTitle(value)
      .then((res) => res.data)
      .catch((err) => console.log(err));

    if (exists) {
      return "Group Name already exists";
    }
  };

  const required = (value) => (value ? undefined : "Required");

  // Components

  return (
    <div className="gridRight" style={{ display: "flex" }}>
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
            <h2>Create Group</h2>
            <Field
              name="title"
              placeholder="Group Name"
              validate={composeValidators(required, groupNameExists)}
            >
              {({ input, meta, placeholder }) => (
                <div>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && (
                    <div className="input-field-error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field
              name="description"
              placeholder="Group Description"
              validate={composeValidators(required)}
            >
              {({ input, meta, placeholder }) => (
                <div>
                  <textarea {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && (
                    <div className="input-field-error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <Field name="rules" placeholder="Group Rules">
              {({ input, meta, placeholder }) => (
                <div>
                  <textarea
                    {...input}
                    placeholder={placeholder}
                    type="textarea"
                  />
                  {meta.error && meta.touched && (
                    <div className="input-field-error">{meta.error}</div>
                  )}
                </div>
              )}
            </Field>
            <h2>Set Topics</h2>
            <div className="topicsCheckBox">
              <div className="topicsCheckBox__wrapper">
                <Field
                  className="topicsCheckBox__wrapper--checkbox"
                  onClick={onCheck}
                  id="sport"
                  name="sport"
                  component="input"
                  value="1"
                  type="checkbox"
                />
                <label
                  className="topicsCheckBox__wrapper--label"
                  htmlFor="sport"
                >
                  Sport
                </label>
              </div>

              <div className="topicsCheckBox__wrapper">
                <Field
                  className="topicsCheckBox__wrapper--checkbox"
                  onClick={onCheck}
                  id="Entertainment"
                  name="Entertainment"
                  component="input"
                  value="1"
                  type="checkbox"
                />
                <label
                  className="topicsCheckBox__wrapper--label"
                  htmlFor="Entertainment"
                >
                  Entertainment
                </label>
              </div>
              <div className="topicsCheckBox__wrapper">
                <Field
                  className="topicsCheckBox__wrapper--checkbox"
                  onClick={onCheck}
                  id="Health"
                  name="Health"
                  component="input"
                  value="1"
                  type="checkbox"
                />
                <label
                  className="topicsCheckBox__wrapper--label"
                  htmlFor="Health"
                >
                  Health
                </label>
              </div>
              <div className="topicsCheckBox__wrapper">
                <Field
                  className="topicsCheckBox__wrapper--checkbox"
                  onClick={onCheck}
                  id="Education"
                  name="Education"
                  component="input"
                  value="1"
                  type="checkbox"
                />
                <label
                  className="topicsCheckBox__wrapper--label"
                  htmlFor="Education"
                >
                  Education
                </label>
              </div>
              <div className="topicsCheckBox__wrapper">
                <Field
                  className="topicsCheckBox__wrapper--checkbox"
                  onClick={onCheck}
                  id="Family"
                  name="Family"
                  component="input"
                  value="1"
                  type="checkbox"
                />
                <label
                  className="topicsCheckBox__wrapper--label"
                  htmlFor="Family"
                >
                  Family
                </label>
              </div>
            </div>
            <div className="groupForm--upload">
              <ImageUploader setImageState={setImageUrl} />
            </div>
            <div className="groupForm--img">
              <img
                className="groupForm--avatar"
                src={imageUrl}
                alt="User Avatar"
              />
            </div>
            <input
              className="btn"
              value="Create"
              type="submit"
              disabled={pristine || submitting}
            />
            <FormSpy subscription={{ submitSucceeded: true, values: true }}>
              {({ submitSucceeded }) => {
                if (submitSucceeded) {
                  history.push(`/groups/${group.id}/home`);
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
};
