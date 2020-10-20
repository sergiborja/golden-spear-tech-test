"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const { MONGODB_URL: uri, PORT } = require("process").env;
const cors = require("./essentials/cors");
const app = express();
// import app from "./config/app";
const api = require("./routes");
app.set("port", PORT);
app.use(cors);
app.use(bodyParser.json());
app.use("/api", api);
app.get("/", (req, res) => {
    res.send("NOT FOUND :(");
});
app.listen(app.get("port"), () => {
    console.log(`Server running on port ${PORT}`);
});
try {
    mongoose.connect(uri, (error) => {
        if (error) {
            console.log(error.message);
        }
        else {
            console.log("Succesfully connected to MongoDB");
        }
    });
}
catch (error) {
    console.error("Could not connect to MongoDB", error);
}
