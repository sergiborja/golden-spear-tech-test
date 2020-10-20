import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import { retrieveUser } from "../../contacts-client-logic";
import Sidebar from "./components/Sidebar";
import ContactInfo from "./components/ContactInfo";
import "./Contacts.sass";

function Contacts() {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    try {
      retrieveUser(sessionStorage.token || localStorage.token)
        .then((body) => {
          setUser(body);
        })
        .catch((error) => setError(error.message));
    } catch (error) {
      if (error) throw error;
    }
  }, []);

  return user ? (
    <section className="contactsScreen">
      <div className="contactsScreen__header">
        <Header username={user.username}></Header>
      </div>
      <div className="contactsScreen__bodyWrapper">
        <div className="contactsScreen__sidebar">
          <Sidebar contacts={user.contacts}></Sidebar>
        </div>
        <div className="contactsScreen__contactInfo">
          <ContactInfo
            myInfo={{
              name: user.name,
              background: user.background,
              social: user.social,
              profilePicture: user.profilePicture,
            }}
          ></ContactInfo>
        </div>
      </div>
    </section>
  ) : (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          <p>Your session has expired, please log in again. TNX </p>
          <a
            onClick={() =>
              sessionStorage.token
                ? delete sessionStorage.token
                : delete localStorage.token
            }
            href="/login-screen/login"
          >
            RETURN TO LOGIN SCREEN
          </a>
        </div>
      )}
    </>
  );
}

export default Contacts;
