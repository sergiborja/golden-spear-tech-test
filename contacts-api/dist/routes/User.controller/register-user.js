"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleError = require("../../essentials/errors/handle-error");
const { registerUser } = require("../../server-logics");
/**
Recieves the data of the new user that wants to be created as req, we send it to the server logic, if everything is correct, we will send an status 201.
*/
module.exports = (req, res) => {
    try {
        registerUser(req.body)
            .then(() => {
            res.status(201).send();
        })
            .catch((error) => {
            handleError(error, res);
        });
    }
    catch (error) {
        handleError(error, res);
    }
};
