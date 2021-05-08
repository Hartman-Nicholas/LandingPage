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
        <h1>All Groups</h1>
        <input name="title" onChange={handleChange} />
        <label htmlFor="Sport"> Sport</label>
        <input
          onChange={(event) => handleChange(event)}
          type="checkbox"
          id="Sport"
          name="Sport"
        />
        <label htmlFor="Health"> Health</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="Health"
          name="Health"
        />
        <label htmlFor="Entertainment"> Entertainment</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="Entertainment"
          name="Entertainment"
        />
        <label htmlFor="Education"> Education</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="Education"
          name="Education"
        />
        <label htmlFor="Family"> Family</label>
        <input
          onChange={handleChange}
          type="checkbox"
          id="Family"
          name="Family"
        />
        <br />
        <div className="group-grid">
          {queryList.length > 0 || flag
            ? queryList.map((group) => (
                <ul className="list">
                  <li className="listItem">
                    <GroupCard
                      key={group.id}
                      groupData={group}
                      joinGroup={(id) => addMember(id)}
                    />
                  </li>
                </ul>
              ))
            : groupsList.map((group) => (
                <ul className="list">
                  <li className="listItem">
                    <GroupCard
                      key={group.id}
                      groupData={group}
                      joinGroup={(id) => addMember(id)}
                    />
                  </li>
                </ul>
              ))}
        </div>

        <br />
      </section>
    </div>
  );
};
