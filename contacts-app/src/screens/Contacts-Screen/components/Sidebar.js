import React, { useEffect, useState } from "react";
import "./Sidebar.sass";
import { useHistory } from "react-router-dom";
// import { generateUsers } from "contacts-client-logic";
const backUnabled = require("../../../images/direction-vectors/back-unabled.png");
const nextUnabled = require("../../../images/direction-vectors/next-unabled.png");
const back = require("../../../images/direction-vectors/back.png");
const next = require("../../../images/direction-vectors/next.png");
const cookTheList = require("../../../algorithms/cook-the-list");

function Sidebar({ contacts }) {
  let history = useHistory();
  const [search, setSearch] = useState("");
  const [contactSelected, setContactSelected] = useState();
  const [contactList, setContactList] = useState();
  const [splitedList, setSplitedList] = useState();
  const [pageState, setPageState] = useState(0);
  const [abc, setAbc] = useState([
    "#",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]);

  useEffect(() => {
    let [, contactSelected] = history.location.search.split("?recent=");
    if (!contactSelected)
      [, contactSelected] = history.location.search.split("?");
    setContactSelected(contactSelected);
    let { splitedList, contactList } = cookTheList(contacts, 20);
    setSplitedList(splitedList);
    setContactList(contactList);
  }, [history.location.search]);

  return (
    <section className="sidebarWrapper">
      <div className="searchContainer">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="searchContainer__input"
          placeholder="Search"
          value={search}
        ></input>
      </div>
      <div className="contactsContainer">
        {abc && (
          <div className="abcContainer">
            {abc.map((letter) => (
              <span
                type="button"
                onClick={() =>
                  letter !== "#"
                    ? setSearch(letter.toUpperCase())
                    : setSearch("")
                }
                className={
                  search === letter.toUpperCase()
                    ? "abcContainer__letter--selected"
                    : "abcContainer__letter"
                }
              >
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        {search === "" && (
          <ul className="contacts">
            {splitedList &&
              splitedList[pageState].map((contact) => (
                <li
                  type="button"
                  className={
                    contact.username === contactSelected
                      ? "contacts__li--selected"
                      : "contacts__li"
                  }
                  onClick={() => {
                    setContactSelected(contact.username);
                    history.push({ search: `${contact.username}` });
                  }}
                  key={contact.name}
                >
                  {contact.name.includes(search) && (
                    <p className="contacts__name">{contact.name}</p>
                  )}
                </li>
              ))}
            {splitedList && search === "" && (
              <div className="contacts__paginationContainer">
                {pageState === 0 ? (
                  <img className="contacts__backIcon" src={backUnabled}></img>
                ) : (
                  <img
                    className="contacts__backIcon"
                    onClick={() => setPageState(pageState - 1)}
                    src={back}
                  ></img>
                )}
                <p className="contacts__paginationName">
                  Page {pageState + 1} of {splitedList.length}
                </p>
                {pageState === splitedList.length - 1 ? (
                  <img className="contacts__nextIcon" src={nextUnabled}></img>
                ) : (
                  <img
                    className="contacts__nextIcon"
                    onClick={() => setPageState(pageState + 1)}
                    src={next}
                  ></img>
                )}
              </div>
            )}
          </ul>
        )}
        {search !== "" && (
          <ul className="contacts">
            {contactList &&
              contactList.map((contact) => (
                <li
                  type="button"
                  className={
                    contact.username === contactSelected
                      ? "contacts__li--selected"
                      : "contacts__li"
                  }
                  onClick={() => {
                    setContactSelected(contact.username);
                    history.push({ search: `${contact.username}` });
                  }}
                >
                  {contact.name.includes(search) && (
                    <p className="contacts__name">{contact.name}</p>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Sidebar;
