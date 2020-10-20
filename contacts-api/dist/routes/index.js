// import express from "express";
const express = require("express");
const { registerUser, authenticateUser, retrieveUser, updateUser, logOut, } = require("./User.controller");
const api = express.Router();
//User (admin) model
api.post("/users", registerUser);
api.post("/users/auth", authenticateUser);
api.get("/users/single/:contactUsername?", retrieveUser);
api.patch("/users", updateUser);
api.get("/users/logout", logOut);
module.exports = api;
