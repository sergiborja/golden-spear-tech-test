import React, { useEffect, useState } from "react";
import { retrieveUser } from "../../../contacts-client-logic";
import "./ContactInfo.sass";
import { useHistory } from "react-router-dom";
const {
  linkedinLogo,
  facebookLogo,
  instagramLogo,
} = require("../../../images/social-media-icons");
const {
  backUnabled,
  nextUnabled,
  back,
  next,
} = require("../../../images/direction-vectors");
const anonymImage = require("../../../images/anonymus-icon.jpg");

const cookTheList = require("../../../algorithms/cook-the-list");

function ContactInfo({ myInfo }) {
  const [contactInfo, setContactInfo] = useState();
  const [recentContacts, setRecentContacts] = useState([]);
  const [contactUsername, setContactUsername] = useState();
  const [actualIndexOfContact, setActualIndexOfContact] = useState(0);
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState();
  const [splitedList, setSplitedList] = useState();
  const [pageState, setPageState] = useState(0);
  const [error, setError] = useState();

  let history = useHistory();

  useEffect(() => {
    if (history.location.search === "") {
      setContactInfo(myInfo);
    }
    let [, contactUsername] = history.location.search.split("?recent=");
    if (!contactUsername) {
      [, contactUsername] = history.location.search.split("?");
      let _recentContacts = recentContacts;
      let alreadyRecent = _recentContacts.indexOf(contactUsername);

      if (alreadyRecent !== -1) _recentContacts.splice(alreadyRecent, 1);
      _recentContacts.push(contactUsername);

      setRecentContacts(_recentContacts);
      setActualIndexOfContact(recentContacts.length - 1);
    }
    setContactUsername(contactUsername);
  }, [history.location.search]);

  useEffect(() => {
    if (contactUsername) {
      const token = sessionStorage.token || localStorage.token;
      try {
        retrieveUser(token, contactUsername)
          .then((contactInfoRetrieved) => {
            setContactInfo(contactInfoRetrieved);
            let { splitedList, contactList } = cookTheList(
              contactInfoRetrieved.contacts,
              10
            );
            setContactList(contactList);
            setSplitedList(splitedList);
          })
          .catch((error) => setError(error));
      } catch (error) {
        if (error) throw error;
      }
    }
  }, [contactUsername]);

  const handleNavigate = (direction) => {
    if (direction === "back") setActualIndexOfContact(actualIndexOfContact - 1);
    else setActualIndexOfContact(actualIndexOfContact + 1);
  };

  useEffect(() => {
    if (recentContacts[actualIndexOfContact])
      history.push({
        search: `recent=${recentContacts[actualIndexOfContact]}`,
      });
  }, [actualIndexOfContact]);

  return (
    <section className="contactInfo">
      {contactInfo && (
        <div className="contactInfo__personal">
          <div className="contactInfo__navbar">
            <div className="contactInfo__imageContainer">
              <img
                src={contactInfo.profilePicture}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = anonymImage;
                }}
                className="contactInfo__image"
              ></img>
            </div>
            <h2 className="contactInfo__name">{contactInfo.name}</h2>
            {history.location.search !== "" && (
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="contactInfo__input"
                placeholder="Search connections"
              ></input>
            )}
          </div>

          <div className="contactInfo__details">
            <p>{contactInfo.background}</p>
            <a href={contactInfo.social.linkedin}>
              <img className="contactInfo__logo" src={linkedinLogo}></img>
            </a>
            <a href={contactInfo.social.facebook}>
              <img className="contactInfo__logo" src={facebookLogo}></img>
            </a>
            <a href={contactInfo.social.instagram}>
              <img className="contactInfo__logo" src={instagramLogo}></img>
            </a>
          </div>
          <div className="contactInfo__historyWrapper">
            <div className="contactInfo__historyButtons">
              {recentContacts[actualIndexOfContact] === recentContacts[0] ? (
                <img
                  className="contactInfo__historyButtons--button"
                  src={backUnabled}
                ></img>
              ) : (
                <img
                  className="contactInfo__historyButtons--button"
                  onClick={() => handleNavigate("back")}
                  src={back}
                ></img>
              )}
              {recentContacts[actualIndexOfContact] ===
              recentContacts[recentContacts.length - 1] ? (
                <img
                  className="contactInfo__historyButtons--button"
                  src={nextUnabled}
                ></img>
              ) : (
                <img
                  className="contactInfo__historyButtons--button"
                  onClick={() => handleNavigate("next")}
                  src={next}
                ></img>
              )}
            </div>
            <div className="contactInfo__historyContactsWrapper">
              {recentContacts.map((username) => (
                <div
                  key={username}
                  className={
                    recentContacts[actualIndexOfContact] === username
                      ? "contactInfo__historyContacts--actual"
                      : "contactInfo__historyContacts"
                  }
                  onClick={() =>
                    setActualIndexOfContact(recentContacts.indexOf(username))
                  }
                >
                  {username}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {search === "" && history.location.search !== "" && (
        <div className="connectionsWrapper">
          {splitedList &&
            splitedList[pageState].map((contact) => (
              <div className="card connectionsWrapper__cardContainer">
                <img
                  src={contact.profilePicture}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = anonymImage;
                  }}
                  className="connectionsWrapper__img"
                  alt="..."
                ></img>
                <div className="card-body">
                  <p className="card-text">{contact.name}</p>
                </div>
              </div>
            ))}
        </div>
      )}
      {splitedList && search === "" && (
        <div className="paginationContainer">
          {pageState === 0 ? (
            <img className="paginationContainer__icon" src={backUnabled}></img>
          ) : (
            <img
              className="paginationContainer__icon"
              onClick={() => setPageState(pageState - 1)}
              src={back}
            ></img>
          )}
          <p className="paginationContainer__name">
            Page {pageState + 1} of {splitedList.length}
          </p>
          {pageState === splitedList.length - 1 ? (
            <img className="paginationContainer__icon" src={nextUnabled}></img>
          ) : (
            <img
              className="paginationContainer__icon"
              onClick={() => setPageState(pageState + 1)}
              src={next}
            ></img>
          )}
        </div>
      )}
      {search !== "" && history.location.search !== "" && (
        <div className="connectionsWrapper">
          {contactList &&
            contactList.map((contact) => (
              <>
                {contact.name.toLowerCase().includes(search.toLowerCase()) && (
                  <div className="card connectionsWrapper__cardContainer">
                    <img
                      src={contact.profilePicture}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = anonymImage;
                      }}
                      className="connectionsWrapper__img"
                    ></img>

                    <div className="card-body">
                      <p className="card-text">{contact.name}</p>
                    </div>
                  </div>
                )}
              </>
            ))}
        </div>
      )}
      {history.location.search === "" && (
        <div>
          <p className="welcome">
            Welcome to your Contacts App, start exploring contacts using the
            left sidebar.
          </p>
          <p className="welcome">Hope you enjoy!</p>
        </div>
      )}
    </section>
  );
}

export default ContactInfo;
