import { Request, Response } from "express";
import { UserDocument } from "../../schemas/user";
const jwt = require("jsonwebtoken");
const {
  env: { SECRET },
} = process;
const handleError = require("../../essentials/errors/handle-error");
const { retrieveUser } = require("../../server-logics");

/** 
If a token is recieved from req headers, retrieves the info of the userId from this token. Otherwise, listens to the body of the req and retrives the user according to that body.

*/

module.exports = async (req: Request, res: Response) => {
  try {
    let [, token] = req.headers.authorization.split(" ");
    let userId: string = jwt.verify(token, SECRET).sub;
    let contactUsername: any = req.params.contactUsername;

    retrieveUser(userId, contactUsername)
      .then((userFound: UserDocument) => {
        res.send(userFound);
      })
      .catch((error: Error) => {
        handleError(error, res);
      });
  } catch (error) {
    handleError(error, res);
  }
};
