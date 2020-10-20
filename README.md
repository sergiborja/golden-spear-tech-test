## Description:

This is a technical test for Golden Spear, it consists on creating an Contacts App. (src link https://docs.google.com/document/d/1XvBXFWKOdGYcQvtnOpj8LJdQu7u07Ui6Bp4gwMn6McU/edit).

## Aux Info

To have a better experience, a contacts app should already have created contacts. In the register form, you have a check option that generates 50 users for you, with 20 more contacts each one of them.

## Instructions:

### Running:

- Run the contacts app:
  From this directory: cd contacts-app; npm start;
  It will automatically open a browser with the correct local port. (3000)
- Run the contacts API server:
  From this directory: cd contacts-api; npm run dev

### .ENV

    -The API url is hiding in the .env, located in: contacts-app/.env (value: REACT_APP_API_URL = http://localhost:{PORT}/api)

    -In the API side, the .ENV is located in: contacts-api/.env
    (value:
    MONGODB_URL = 'mongodb://localhost:27017/contacts'
    TEST_MONGODB_URL = 'mongodb://localhost:27017/contacts-test'
    PORT = {PORT}
    SECRET = 'lescatiusquesdeligorsondemoscou')

## THANK YOU FOR READING :)
