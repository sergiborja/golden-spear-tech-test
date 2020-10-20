import { UnexistenceError } from "./../essentials/errors/error-builder";
import UserSchema, { UserDocument } from "../schemas/user";

/** 
Updates the user contacts with this username with the newContacts

@param {string} username The name of the new user.
@param {string} newContacts The surname of the new user.

@throws {DuplicityError} If the email is already registered to our database.
@throws {DuplicityError} If the nick name is already registered to our database.
*/

module.exports = async (body: any) => {
  const { username, newContacts } = body;

  const userFound: any = await UserSchema.findOne({ username });
  if (!userFound)
    throw new UnexistenceError("There has been an error finding your user");

  userFound.contacts = newContacts;

  await userFound.save();
};
