import React, { useEffect, useState } from "react";
import {
  Route,
  withRouter,
  Redirect,
  BrowserRouter,
  useHistory,
} from "react-router-dom";
import Login from "./screens/Login-Screen/Login";
import Contacts from "./screens/Contacts-Screen/Contacts";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(sessionStorage.token || localStorage.token);
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Route
            path="/"
            render={() =>
              token ? (
                <Redirect to="/contacts-screen" />
              ) : (
                <Redirect to="/login-screen/login" />
              )
            }
          />
          <Route path="/login-screen" render={() => <Login />} />
          <Route path="/contacts-screen" render={() => <Contacts />} />
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
