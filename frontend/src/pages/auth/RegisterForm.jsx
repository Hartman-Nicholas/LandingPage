import React, { useState } from "react";

import Auth from "../../services/Auth";
import UserApi from "../../api/UserApi";
import { InvalidCredentials, UserExists } from "./InvalidCredentials";

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//Registeration state:
	const [isSuccessful, setIsSuccessful] = useState(true);
	const [doesUsernameExist, setDoesUsernameExists] = useState(false);

	async function register(registrationData) {
		const registerSuccess = await Auth.register(registrationData);
		if (!registerSuccess) {
			setIsSuccessful(false);
		}
	}
	const checkUsername = async (username) => {
		await UserApi.userNameExists(username)
			.then((res) => setDoesUsernameExists(res.data))
			.catch((err) => console.log(err));
	};

	const handleSubmit = (e) => {
		checkUsername(name);
		if (!doesUsernameExist) {
			register({ name, email, password });
		}
	};

	return (
		<div>
			<h2>Sign up</h2>
			<div>
				<div>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
					/>
				</div>

				<div>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
					/>
				</div>

				<div>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>

				<div>
					<button type="submit" onClick={handleSubmit}>
						Create account
					</button>
					{doesUsernameExist ? (
						<UserExists />
					) : !isSuccessful ? (
						<InvalidCredentials />
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}
