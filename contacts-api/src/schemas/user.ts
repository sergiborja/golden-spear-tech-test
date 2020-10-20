import mongoose = require("mongoose");
import { Document, model } from "mongoose";

export class User {
  name: { type: String; required: true };
  username: { type: String; required: true };
  email: { type: String; required: true };
  password: { type: String; required: true };
  background: { type: String; required: true };
  contacts: [
    {
      name: string;
      username: { type: String };
      profilePicture: string;
    }
  ];
  social: {
    linkedin: { type: String };
    facebook: { type: String };
    instagram: { type: String };
  };
  profilePicture: { type: String; required: true };
  online: { type: Boolean; required: false };

  constructor(data: {
    name: { type: String; required: true };
    username: { type: String; required: true };
    email: { type: String; required: true };
    password: { type: String; required: true };
    background: { type: String; required: true };
    contacts: [
      {
        name: string;
        username: { type: String };
        profilePicture: string;
      }
    ];
    social: {
      linkedin: { type: String };
      facebook: { type: String };
      instagram: { type: String };
    };
    profilePicture: { type: String; required: true };
    online: { type: Boolean; required: false };
  }) {
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

export interface UserDocument extends User, Document {}
const UserSchema = mongoose.model("User", schema);
export default UserSchema;
