const express = require("express");
const userRoutes = require("./routes/user.route")
const mongoose = require("mongoose");

const app = express()

const databasePassword = "bet6M2GW8tNMLC9k"

const url =
    "mongodb+srv://alexisthierry:" + databasePassword + "@cluster0.4hiwmtc.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(url)
    .then(() => console.log("connection_successfull"))
    .catch(() => console.log("connection_failed"));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use("/api/user", userRoutes);

module.exports = app;