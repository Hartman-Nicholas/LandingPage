import { useRecoilValue } from "recoil";
import { userDataState } from "../../state/userDataState";

export default function UserCard() {
	//TODO Fix user data isnt fetching
	const userData = useRecoilValue(userDataState);

	return (
		<section>
			<div>UserCard Template</div>
			<div>{userData.name}</div>
			<div> {userData.email}</div>
		</section>
	);
}
