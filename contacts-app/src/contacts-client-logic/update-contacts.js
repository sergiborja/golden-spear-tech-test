const call = require("./call/call");
const context = require("./context");

/**
 * Updates de username contacts with the newContacts param
 * 
 * @param {string} username
 * @param {string} newContacts

 *  *
 *
 * @throws {Error} If any of the parameters does not match the corresponding type.
 */

module.exports = function (username, newContacts) {
  return call(
    "PATCH",
    `${this.API_URL}/users`,
    JSON.stringify({
      username,
      newContacts,
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
