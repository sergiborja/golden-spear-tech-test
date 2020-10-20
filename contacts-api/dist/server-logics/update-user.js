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
const error_builder_1 = require("./../essentials/errors/error-builder");
const user_1 = require("../schemas/user");
/**
Updates the user contacts with this username with the newContacts

@param {string} username The name of the new user.
@param {string} newContacts The surname of the new user.

@throws {DuplicityError} If the email is already registered to our database.
@throws {DuplicityError} If the nick name is already registered to our database.
*/
module.exports = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, newContacts } = body;
    const userFound = yield user_1.default.findOne({ username });
    if (!userFound)
        throw new error_builder_1.UnexistenceError("There has been an error finding your user");
    userFound.contacts = newContacts;
    yield userFound.save();
});
