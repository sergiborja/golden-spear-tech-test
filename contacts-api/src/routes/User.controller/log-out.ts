import * as dotenv from "dotenv";
dotenv.config();
const {
  env: { SECRET },
} = process;
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
const handleError = require("../../essentials/errors/handle-error");
const { logOut } = require("../../server-logics");

/** 
Recieves an email and a password from the Req, sends it to the server logic and if everything is okay, a new jwt token will be sent as Res.
*/

module.exports = async (req: Request, res: Response) => {
  try {
    let [, token] = req.headers.authorization.split(" ");
    let userId: string = jwt.verify(token, SECRET).sub;

    logOut(userId)
      .then(() => {
        res.send(res.status(201).send());
      })
      .catch((error: Error) => {
        handleError(error, res);
      });
  } catch (error) {
    handleError(error, res);
  }
};
