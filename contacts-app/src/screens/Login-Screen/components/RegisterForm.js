import React, { useState } from "react";
import "./Forms.sass";
import { Link } from "react-router-dom";
import {
  registerUser,
  generateUsers,
  updateContacts,
} from "../../../contacts-client-logic";

function RegisterForm({ history }) {
  const [error, setError] = useState();
  const [generatingUsers, setGeneratingUsers] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let {
      name,
      username,
      email,
      password,
      background,
      linkedin,
      facebook,
      instagram,
      createContacts,
    } = event.target;

    createContacts = createContacts.checked;
    name = name.value;
    username = username.value;
    email = email.value;
    password = password.value;
    background = background.value;
    linkedin = linkedin.value;
    facebook = facebook.value;
    instagram = instagram.value;

    try {
      registerUser(
        name,
        username,
        email,
        password,
        background,
        linkedin,
        facebook,
        instagram
      )
        .then(() => {
          setGeneratingUsers(true);
          if (createContacts) {
            generateUsers()
              .then((newContacts) => {
                updateContacts(username, newContacts)
                  .then(() => {
                    setGeneratingUsers(false);
                    history.push("login");
                  })
                  .catch((error) => setError(error.message));
              })
              .catch((error) => setError(error.message));
          } else history.push("login");
        })
        .catch((error) => setError(error.message));
    } catch (error) {
      if (error) throw error;
    }
  };

  return !generatingUsers ? (
    <form className="formWrapper" onSubmit={handleSubmit}>
      <h2 className="formWrapper__title">Sign Up</h2>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Name"
          name="name"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          aria-describedby="emailHelp"
          placeholder="Username"
          name="username"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="email"
          className="form-control inputColor"
          placeholder="Email"
          name="email"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control inputColor"
          placeholder="Write your password"
          name="password"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control inputColor"
          placeholder="Tell us about you"
          name="background"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control inputColor"
          placeholder="Linkedin url"
          name="linkedin"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control inputColor"
          placeholder="Facebook url"
          name="facebook"
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control inputColor"
          placeholder="Instagram url"
          name="instagram"
          required
        />
      </div>
      <div className="form-group form-check formWrapper__check">
        <input
          name="createContacts"
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        ></input>
        <label className="form-check-label formWrapper__check">
          Generate contacts for me. Preferably..
        </label>
        <div className="formWrapper__explainContainer">
          <p className="formWrapper__explain">
            *This will generate 50 contacts, each of them has 20 connections and
            it's generated with random names, profile pictures, social media
            etc..
          </p>
        </div>
      </div>
      {error && <p className="formWrapper__errorFeedback">{error}</p>}
      <button className="btn btn-outline-danger formWrapper__submitButton">
        Sign In
      </button>
      <Link to={"login"}>I already have an account</Link>
    </form>
  ) : (
    <div className="loadingContainer">
      <div class="spinner-border" role="status"></div>
      <p className="loadingContainer__text">Generating your contacts...</p>
    </div>
  );
}

export default RegisterForm;
