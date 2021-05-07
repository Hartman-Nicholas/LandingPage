import { useRecoilValue } from "recoil";
import { userDataState } from "../../state/userDataState";
export default function UserCard() {
	const userData = useRecoilValue(userDataState);

	console.log(userData.posts)

	return (
    <section>
        <div>UserCard Template</div>
        <div>{userData.name}</div>
        <div> {userData.email}</div>
        <div> {userData.bio}</div>
    </section>
  );
}
