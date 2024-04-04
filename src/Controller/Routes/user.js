const express = require("express");
const { register, login } = require("../UserController");

const user = express.Router();

user.post("/register", register);
user.get("/login", login);
module.exports = user;
