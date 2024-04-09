const express = require("express");
const validator = require("validator");
const { register, login, getUserById } = require("../UserController");
const { middleId } = require("../../Middleware/middleware");

const user = express.Router();

user.post("/register", register);
user.post("/login", login);
user.get("/:id", middleId, getUserById);
module.exports = user;
