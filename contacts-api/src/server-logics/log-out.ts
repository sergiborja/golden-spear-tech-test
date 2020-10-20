import * as dotenv from "dotenv";
dotenv.config();
import UserSchema from "./../schemas/user";
const bcrypt = require("bcrypt");

const { UnexistenceError } = require("../essentials/errors/error-builder");

/** 
Recieves de userId and changes the online state

@param {string} userId The email (already registered).

@throws {UnexistenceError} If the email doesn't exist.
*/

module.exports = async (userId: string) => {
  const userFound: any = await UserSchema.findById(userId);
  if (!userFound) throw new UnexistenceError("Invalid token");
  else {
    userFound.online = false;
    await userFound.save();
  }
};
