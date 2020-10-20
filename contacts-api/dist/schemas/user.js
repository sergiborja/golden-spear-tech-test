"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
class User {
    constructor(data) {
        this.name = data.name;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password;
        this.background = data.background;
        this.social = data.social;
        this.contacts = data.contacts;
        this.online = data.online;
        this.profilePicture = data.profilePicture;
    }
}
exports.User = User;
var schema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    background: { type: String, required: true },
    contacts: [
        {
            name: { type: String },
            username: { type: String },
            profilePicture: { type: String },
        },
    ],
    social: {
        linkedin: { type: String },
        facebook: { type: String },
        instagram: { type: String },
    },
    profilePicture: { type: String, required: true },
    online: { type: Boolean },
});
const UserSchema = mongoose.model("User", schema);
exports.default = UserSchema;
