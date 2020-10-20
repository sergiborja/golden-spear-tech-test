const call = require("./call/call");
const context = require("./context");

/**
 * Changes online state of that user to disconnected.
 *
 * @param {string} token The token.
 *
 * @throws {Error} If internal error raise.
 */

module.exports = function (token) {
  return call("GET", `${this.API_URL}/users/logout`, undefined, {
    Authorization: `Bearer ${token}`,
  }).then(({ status, body }) => {
    if (status === 201) {
      return;
    } else {
      const { error } = JSON.parse(body);

      throw new Error(error);
    }
  });
}.bind(context);
