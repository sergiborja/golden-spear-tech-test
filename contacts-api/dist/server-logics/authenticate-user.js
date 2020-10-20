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
const user_1 = require("./../schemas/user");
const jwtPromised = require("../essentials/jwt-promised");
const { env: { SECRET }, } = process;
const bcrypt = require("bcrypt");
const { UnexistenceError, CredentialsError, } = require("../essentials/errors/error-builder");
/**
Recieves an email and a password, it the creadentials are correct, a new jwt token will be sent.

@param {string} email The email (already registered).
@param {string} password The password (already registered).

@throws {UnexistenceError} If the email doesn't exist.
@throws {CredentialsError} If the password is not correct.
*/
module.exports = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_1.default.findOne({ email });
    if (!userFound)
        throw new UnexistenceError("Email not found");
    else {
        const match = yield bcrypt.compare(password, userFound.password);
        if (!match)
            throw new CredentialsError("Incorrect Password");
        const token = yield jwtPromised.sign({ sub: userFound.id }, SECRET, {
            expiresIn: "1d",
        });
        userFound.online = true;
        yield userFound.save();
        return token;
    }
});
