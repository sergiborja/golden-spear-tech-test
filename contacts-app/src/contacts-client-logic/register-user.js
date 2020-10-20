const call = require("./call/call");
const context = require("./context");
const fetch = require("node-fetch");

/**
 * Creates an user with param's credentials
 *
 * @param {string} name
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} background
 * @param {string} linkedin
 * @param {string} facebook
 * @param {string} instagram
 *  *
 *
 * @throws {TypeError} If any of the parameters does not match the corresponding type.
 */

module.exports = function (
  name,
  username,
  email,
  password,
  background,
  linkedin,
  facebook,
  instagram
) {
  return call(
    "POST",
    `${this.API_URL}/users`,
    JSON.stringify({
      name,
      username,
      email,
      password,
      background,
      social: { linkedin, facebook, instagram },
      profilePicture: `https://picsum.photos/id/${Math.floor(
        1084 * Math.random()
      )}/200`,
    }),
    { "Content-type": "application/json" }
  ).then(({ status, body }) => {
    if (status === 201) {
      return;
    } else {
      const { error } = JSON.parse(body);

      throw new Error(error);
    }
  });
}.bind(context);
