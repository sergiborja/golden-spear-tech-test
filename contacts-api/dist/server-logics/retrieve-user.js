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
If contacts username is defined, returns the contact of that user, otherwise, returns the info of the admin.

@param {string} userId
@param {string} contactUsername

@throws {DuplicityError}
@throws {UnexistenceError}
*/
module.exports = (userId, contactUsername) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_1.default.findById(userId);
    if (userFound.online) {
        if (userFound && contactUsername) {
            const contactFound = yield user_1.default.findOne({
                username: contactUsername,
            });
            return contactFound;
        }
        if (!userFound)
            throw new error_builder_1.UnexistenceError("This user does not exist");
        return userFound;
    }
    else
        throw new Error("This user is disconnected, please login first.");
});
