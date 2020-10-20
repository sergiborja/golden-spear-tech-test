import UserSchema, { UserDocument } from "../schemas/user";
import { DuplicityError } from "../essentials/errors/error-builder";
const bcrypt = require("bcrypt");

/** 
Recieves the data of the new user that wants to be created.

@param {string} name,
@param {string} username,
@param {string} email,
@param {string} password,
@param {string} background,
@param {string} social,
@param {string} contacts,
@param {string} profilePicture,

@throws {DuplicityError} If the email is already registered to our database.
@throws {DuplicityError} If the nick name is already registered to our database.
*/

module.exports = async (body: UserDocument) => {
  const {
    name,
    username,
    email,
    password,
    background,
    social,
    contacts,
    profilePicture,
  } = body;

  const hash = await bcrypt.hash(password, 10);

  const emailFound = await UserSchema.findOne({ email });
  if (emailFound) throw new DuplicityError("This email already exists");

  const usernameFound = await UserSchema.findOne({ username });
  if (usernameFound) throw new DuplicityError("This username already exists");

  await UserSchema.create({
    name,
    username,
    email,
    password: hash,
    background,
    social,
    contacts,
    profilePicture,
  });
};
