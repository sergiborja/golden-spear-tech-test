import React from "react";
import { withRouter } from "react-router-dom";
import { logOut } from "../../../contacts-client-logic";
import "./Header.sass";

function Header({ username, history }) {
  const handleLogOut = () => {
    logOut(sessionStorage.token || localStorage.token).then(() => {
      history.push("/login-screen/login");
      delete localStorage.token;
      delete sessionStorage.token;
    });
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <a className="navbar-brand navbar__title" href="/contacts-screen">
        Contacts Tool
      </a>
      <div
        className="collapse navbar-collapse navbar__dropdownContainer"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <li className="nav-item dropdown">
            <div className="btn-group">
              {username && (
                <button
                  onClick={() => history.push(`/contacts-screen`)}
                  type="button"
                  className="btn btn-secondary navbar__dropdownButton"
                >
                  {username}
                </button>
              )}
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle dropdown-toggle-split navbar__dropdownButton"
                id="dropdownMenuReference"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-reference="parent"
              >
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div
                className="dropdown-menu navbar__dropdownMenu"
                aria-labelledby="dropdownMenuReference"
              >
                <a className="dropdown-item" onClick={() => handleLogOut()}>
                  Log Out
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Header);
