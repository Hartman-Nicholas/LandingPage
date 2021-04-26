// NPM Packages

//Project files

export default function Header({ onLogout, loggedIn }) {
  // Components

  return (
    <nav>
      <div>
        <ul>
          <li>Template Header</li>
          {loggedIn && (
            <li>
              <button type="button" onClick={onLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
