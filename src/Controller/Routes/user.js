const express = require("express");
const validator = require("validator");
const {
  register,
  login,
  getUserById,
  getAllUser,
  isAdmin,
  getUserByEmail,
} = require("../UserController");
const { middleId, middleEmail } = require("../../Middleware/middleware");

const user = express.Router();
user.post("/email", getUserByEmail);
user.post("/register", middleEmail, register);
user.post("/login", middleEmail, login);
user.post("/isAdmin", middleId, isAdmin);
user.get("/all", getAllUser);
user.get("/:id", middleId, getUserById);

module.exports = user;
