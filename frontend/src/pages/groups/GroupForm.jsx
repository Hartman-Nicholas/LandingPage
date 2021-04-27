// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import { groupDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";

export const GroupForm = () => {
	// State
	const [groupForm, setGroupForm] = useState({
		title: "",
		description: "",
	});
	const [groupData, setGroupData] = useRecoilState(groupDataState);

	// Constants
	async function createGroup(groupData) {
		try {
			await GroupApi.createGroup(groupData);
			GroupApi.getAllGroups()
				.then(({ data }) => setGroupData(data))
				.catch((err) => console.error(err));
		} catch (e) {
			console.error(e);
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setGroupForm({
			...groupForm,
			[name]: value,
		});
		console.log("groupForm", groupForm);
	};

	const handleSubmit = async (e) => {
		createGroup(groupForm);
		e.preventDefault();
	};
	// Components

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={groupForm.title}
				onChange={handleChange}
				placeholder="Group name"
				type="text"
				name="title"
				required
			/>
			<br />
			<textarea
				value={groupForm.description}
				onChange={handleChange}
				placeholder="Group description"
				type="text"
				name="description"
				required
			/>
			<button type="submit">Submit</button>
		</form>
	);
};
