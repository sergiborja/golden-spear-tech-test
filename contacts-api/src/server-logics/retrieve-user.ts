import { UnexistenceError } from "./../essentials/errors/error-builder";
import UserSchema, { UserDocument } from "../schemas/user";
/** 
If contacts username is defined, returns the contact of that user, otherwise, returns the info of the admin.

@param {string} userId
@param {string} contactUsername 

@throws {DuplicityError} 
@throws {UnexistenceError} 
*/

module.exports = async (userId: string, contactUsername: string) => {
  const userFound: any = await UserSchema.findById(userId);
  if (userFound.online) {
    if (userFound && contactUsername) {
      const contactFound: any = await UserSchema.findOne({
        username: contactUsername,
      });
      return contactFound;
    }
    if (!userFound) throw new UnexistenceError("This user does not exist");

    return userFound;
  } else throw new Error("This user is disconnected, please login first.");
};
