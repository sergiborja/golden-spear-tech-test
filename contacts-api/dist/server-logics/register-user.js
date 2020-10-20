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
const user_1 = require("../schemas/user");
const error_builder_1 = require("../essentials/errors/error-builder");
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
module.exports = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, email, password, background, social, contacts, profilePicture, } = body;
    const hash = yield bcrypt.hash(password, 10);
    const emailFound = yield user_1.default.findOne({ email });
    if (emailFound)
        throw new error_builder_1.DuplicityError("This email already exists");
    const usernameFound = yield user_1.default.findOne({ username });
    if (usernameFound)
        throw new error_builder_1.DuplicityError("This username already exists");
    yield user_1.default.create({
        name,
        username,
        email,
        password: hash,
        background,
        social,
        contacts,
        profilePicture,
    });
});
