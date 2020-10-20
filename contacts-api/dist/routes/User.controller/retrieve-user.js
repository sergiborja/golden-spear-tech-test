"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const { env: { SECRET }, } = process;
const handleError = require("../../essentials/errors/handle-error");
const { retrieveUser } = require("../../server-logics");
/**
If a token is recieved from req headers, retrieves the info of the userId from this token. Otherwise, listens to the body of the req and retrives the user according to that body.

*/
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let [, token] = req.headers.authorization.split(" ");
        let userId = jwt.verify(token, SECRET).sub;
        let contactUsername = req.params.contactUsername;
        retrieveUser(userId, contactUsername)
            .then((userFound) => {
            res.send(userFound);
        })
            .catch((error) => {
            handleError(error, res);
        });
    }
    catch (error) {
        handleError(error, res);
    }
});
