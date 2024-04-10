const express = require("express");
const validator = require("validator");
const {
  createAnnonce,
  getAllAnnonce,
  deleteAnnonceById,
  patchAnnonce,
  getAnnonceById,
  compareUserId,
} = require("../AnnonceController");
const { middleId, middleURL } = require("../../Middleware/middleware");
const annonce = express.Router();

annonce.post("/create", middleId, middleURL, createAnnonce);
annonce.get("/all", getAllAnnonce);
annonce.delete("/delete", deleteAnnonceById);
annonce.patch("/update", middleId, patchAnnonce);
annonce.post("/compareUserId", middleId, compareUserId);
annonce.get("/:id", getAnnonceById);
module.exports = annonce;
