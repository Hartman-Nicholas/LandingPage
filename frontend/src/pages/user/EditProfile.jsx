import React, {useState} from 'react'

export default function EditProfile({ currentUser }) {
  console.log({currentUser})
  const [userForm, setUserForm] = useState({currentUser});

  return (
    <div>
      Edit Profile Form
      <div>
        <form action="">
          <label htmlFor="">Name</label>
          <input type="text" value={currentUser.name} />
        </form>
      </div>
    </div>
  );
}
