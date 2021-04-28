import React, { useState } from "react";

import Auth from "../../services/Auth";
import UserApi from "../../api/UserApi";
import {InvalidCredentials} from './InvalidCredentials'

export default function RegisterForm() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSuccessful, setIsSuccessful] = useState(true);

	async function register(registrationData) {
		const registerSuccess = await Auth.register(registrationData);
		if (!registerSuccess) {
      setIsSuccessful(false)
		}
	}

	// const checkUsername = async (username) => {
	// 	UserApi.userNameExists(username)
	// 		.then((res) => setDoesUsernameExists(res))
	// 		.catch((err) => console.log(err));
	// };

	const handleSubmit = (e) => {
		// checkUsername(name);

		// if (!doesUsernameExists) {
			return register({ name, email, password });
		// } else {
		// 	alert("username already exists");
		// }
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
          {!isSuccessful &&
          <InvalidCredentials/>
          }
					<button type="submit" onClick={handleSubmit}>
						Create account
					</button>
				</div>
			</div>
		</div>
	);
}
