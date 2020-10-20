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
const bcrypt = require("bcrypt");
const { UnexistenceError } = require("../essentials/errors/error-builder");
/**
Recieves de userId and changes the online state

@param {string} userId The email (already registered).

@throws {UnexistenceError} If the email doesn't exist.
*/
module.exports = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield user_1.default.findById(userId);
    if (!userFound)
        throw new UnexistenceError("Invalid token");
    else {
        userFound.online = false;
        yield userFound.save();
    }
});
