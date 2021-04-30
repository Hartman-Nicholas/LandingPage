// NPM Packages
import { useState } from "react";
import { useRecoilState } from "recoil";

// Project files
import { groupDataState, userDataState } from "../../state/userDataState";
import GroupApi from "../../api/GroupApi";
import UserApi from "../../api/UserApi";

export const GroupForm = () => {
	// State
	const [groupForm, setGroupForm] = useState({
		title: "",
		description: "",
	});
	const [userData, setUserData] = useRecoilState(userDataState);
	const [groupData, setGroupData] = useRecoilState(groupDataState);
	// Constants
	async function createGroup(requestBody) {
		try {
			await GroupApi.createGroup(requestBody);
			// await GroupApi.getAllGroups().then(({ data }) => {
			// 	setGroupData(data);
			// });
			await UserApi.getUser().then(({data}) => setUserData(data))
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
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		createGroup(groupForm);
		setGroupForm({
			title: "",
			description: "",
		});
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
