const express = require("express");
const { register, login, getUserById } = require("../UserController");

const user = express.Router();

user.post("/register", register);
user.post("/login", login);
user.get("/:id", getUserById);
module.exports = user;
