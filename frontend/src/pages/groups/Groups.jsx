// NPM Packages
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
// Project files
import { GroupCard } from "./GroupCard";
import { OwnerGroupsBar } from "./group-details/OwnerGroupBar";
import { userDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";

export const Groups = () => {
  // State
  const [groupsList, setGroupsList] = useState([]);
  const [userData, setUserData] = useRecoilState(userDataState);
  const [flag, setFlag] = useState(false);
  const query = useRef({
    title: "",
    topics: [],
  });
  const [queryList, setQueryList] = useState([]);

  // Constants
  const addMember = async (groupId) => {
    await GroupApi.joinGroup(groupId).then(({ data }) => {
      let updatedGroupsList = groupsList.filter(
        (group) => group.id !== data.id
      );
      setGroupsList(updatedGroupsList);
      let userGroups = userData.groupsJoined.concat(data);
      setUserData({ ...userData, groupsJoined: userGroups });
    });
  };

  useEffect(() => {
    const groupList = async () => {
      await GroupApi.getAllGroups().then(({ data }) => setGroupsList(data));
    };
    groupList();
  }, [userData.groupsJoined]);

  // handle search bar:
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title") {
      if (value.length === 0) {
        setFlag(false);
      } else {
        setFlag(true);
      }
      query.current = { ...query.current, [name]: value };
    } else {
      if (query.current.topics.includes(name)) {
        setFlag(false);
        query.current = {
          ...query.current,
          topics: query.current.topics.filter((topic) => topic !== name),
        };
      } else {
        setFlag(true);
        query.current = {
          ...query.current,
          topics: [...query.current.topics, name],
        };
      }
    }

    let filteredList = groupsList.filter((group) => {
      if (query.current.title === "") {
        return group.topics.some(
          (topic) => query.current.topics.indexOf(topic) >= 0
        );
      } else if (query.current.topics.length === 0) {
        return group.title
          .toLowerCase()
          .includes(query.current.title.toLowerCase());
      } else {
        return (
          group.title.includes(query.current.title) &&
          group.topics.some((topic) => query.current.topics.indexOf(topic) >= 0)
        );
      }
    });

    setQueryList(filteredList);
  };

  // Components

  return (
    <div className="gridRight" style={{ display: "flex" }}>
      <section id="non-sidebar">
        <h2 className="beginning" style={{ fontStyle: "italic" }}>
          “Alone, we can do so little, together, we can do so much”
          <span style={{ fontStyle: "normal", fontWeight: "100" }}>
            {" "}
            – Helen Keller
          </span>
        </h2>
        <div className="search__container">
          <input
            placeholder="SEARCH"
            className="search__input"
            name="title"
            onChange={handleChange}
          />
        </div>

        <div className="checkbox-container">
          <ul className="ks-cboxtags">
            <li>
              <input
                onChange={handleChange}
                name="Sport"
                type="checkbox"
                id="Sport"
              />
              <label htmlFor="Sport">Sport</label>
            </li>
            <li>
              <input
                onChange={handleChange}
                name="Entertainment"
                type="checkbox"
                id="Entertainment"
              />
              <label htmlFor="Entertainment">Entertainment</label>
            </li>
            <li>
              <input
                onChange={handleChange}
                name="Health"
                type="checkbox"
                id="Health"
              />
              <label htmlFor="Health">Health</label>
            </li>
            <li>
              <input
                onChange={handleChange}
                name="Education"
                type="checkbox"
                id="Education"
              />
              <label htmlFor="Education">Education</label>
            </li>
            <li>
              <input
                onChange={handleChange}
                name="Family"
                type="checkbox"
                id="Family"
              />
              <label htmlFor="Family">Family</label>
            </li>
          </ul>
        </div>

        <section className="group-grid container">
          {queryList.length > 0 || flag
            ? queryList.map((group) => (
                <GroupCard
                  key={group.id}
                  groupData={group}
                  joinGroup={(id) => addMember(id)}
                />
              ))
            : groupsList.map((group) => (
                <GroupCard
                  key={group.id}
                  groupData={group}
                  joinGroup={(id) => addMember(id)}
                />
              ))}
        </section>
      </section>
    </div>
  );
};
