import { useRecoilValue } from "recoil";
import { getUserData } from "../../state/recoilFetch";

export default function UserCard() {
  const { data } = useRecoilValue(getUserData);
  console.log(data);

  return (
    <section>
      <div>UserCard Template</div>
      <div>{data.name}</div>
      <div> {data.email}</div>
    </section>
  );
}
