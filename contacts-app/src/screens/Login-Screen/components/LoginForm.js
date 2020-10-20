import React, { useState } from "react";
import "./Forms.sass";
import { Route, Link, Redirect } from "react-router-dom";
import { authenticateUser } from "../../../contacts-client-logic";
import { useHistory } from "react-router-dom";

function LoginForm() {
  let history = useHistory();
  const [error, setError] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    let { email, password, remember } = event.target;

    remember = remember.checked;
    email = email.value;
    password = password.value;

    try {
      authenticateUser(email, password)
        .then((token) => {
          if (remember) localStorage.token = token;
          else sessionStorage.token = token;
          history.push("/contacts-screen");
        })
        .catch((error) => setError(error.message));
    } catch (error) {
      if (error) throw error;
    }
  };
  return (
    <form className="formWrapper" onSubmit={handleSubmit}>
      <h2 className="formWrapper__title">Sign In</h2>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Email"
          name="email"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control inputColor"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          required
        />
      </div>
      <div className="form-group form-check">
        <input
          name="remember"
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        ></input>
        <label className="form-check-label formWrapper__check">
          Remember me
        </label>
      </div>
      {error && <p className="formWrapper__errorFeedback">{error}</p>}
      <button className="btn btn-outline-danger formWrapper__submitButton">
        Sign In
      </button>
      <Link to={"register"}>Not having an account? Sign up!</Link>
      <p className="formWrapper__dataText">
        None of this data will be shared or used out of this local API.
      </p>
    </form>
  );
}

export default LoginForm;
