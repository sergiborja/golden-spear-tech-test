module.exports = (contacts, splitNum) => {
  let contactList = [];
  contacts.map((contact) => contactList.push(contact.name));
  contactList.sort();
  contacts.map((contact) => {
    let indexOfContact = contactList.indexOf(contact.name);
    contactList[indexOfContact] = {
      name: contact.name,
      username: contact.username,
      profilePicture: contact.profilePicture,
    };
  });

  let splitedList = [];
  let i = 0;
  let key = 0;
  splitedList[key] = [];
  contactList.map((contact) => {
    i++;
    splitedList[key].push(contact);
    if (i === splitNum && contactList[contactList.length - 1] !== contact) {
      i = 0;
      key++;
      splitedList[key] = [];
    }
  });

  return { splitedList, contactList };
};
