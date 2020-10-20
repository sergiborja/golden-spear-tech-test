const call = require("./call/call");
const context = require("./context");
require("dotenv").config();

/**
 * if token is valid, retrieves the info of the contact username
 *
 * @param {string} token
 * @param {string} contactUsername

 *  *
 *
 * @throws {Error} If token is invalid
 */

module.exports = function (token, contactUsername) {
  let endpoint;
  contactUsername ? (endpoint = contactUsername) : (endpoint = "");
  return call("GET", `${this.API_URL}/users/single/${endpoint}`, undefined, {
    Authorization: `Bearer ${token}`,
  }).then(({ status, body }) => {
    if (status === 200) {
      let userRetrieved = JSON.parse(body);
      delete userRetrieved.password;
      delete userRetrieved._id;
      delete userRetrieved.__v;

      return userRetrieved;
    } else {
      const { error } = JSON.parse(body);

      throw new Error(error);
    }
  });
}.bind(context);
