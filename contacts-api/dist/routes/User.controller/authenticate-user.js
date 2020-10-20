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
const dotenv = require("dotenv");
dotenv.config();
const handleError = require("../../essentials/errors/handle-error");
const { authenticateUser } = require("../../server-logics");
/**
Recieves an email and a password from the Req, sends it to the server logic and if everything is okay, a new jwt token will be sent as Res.
*/
module.exports = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let email = req.body.email;
        let password = req.body.password;
        authenticateUser(email, password)
            .then((token) => {
            res.send({ token });
        })
            .catch((error) => {
            handleError(error, res);
        });
    }
    catch (error) {
        handleError(error, res);
    }
});
