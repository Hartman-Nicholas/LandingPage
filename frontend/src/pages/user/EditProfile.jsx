import React, {useState} from 'react'

export default function EditProfile({ currentUser }) {
  console.log({currentUser})
  const [userForm, setUserForm] = useState({currentUser});

  return (
    <div>
      Edit Profile Form
      <div>
        <form action="">
          <div>
            <label htmlFor="">Name</label>
            <input type="text" value={currentUser.name} />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="text" value={currentUser.email} />
          </div>
          <div>
            <label htmlFor="">Bio</label>
            <input type="text" value={currentUser.bio} />
          </div>
        </form>
      </div>
    </div>
  );
}
