const express = require("express");
const {
  createAnnonce,
  getAllAnnonce,
  deleteAnnonce,
} = require("../AnnonceController");
const annonce = express.Router();

annonce.post("/create", createAnnonce);
annonce.get("/all", getAllAnnonce);
annonce.delete("/delete", deleteAnnonce);
module.exports = annonce;
