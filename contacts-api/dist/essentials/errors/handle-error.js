"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = function (error, res) {
    let status = 500;
    if (error.name === "UnexistenceError" || error.name === "DuplicityError")
        status = 409;
    else if (error.name === "TypeError" || error.name === "VoidError")
        status = 406;
    else if (error.name === "CredentialsError")
        status = 401;
    res.status(status).json({ error: error.message });
};
