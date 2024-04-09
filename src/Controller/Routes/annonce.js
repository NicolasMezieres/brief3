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
annonce.get("/:id", getAnnonceById);
annonce.post("/compareUserId", middleId, compareUserId);

module.exports = annonce;
