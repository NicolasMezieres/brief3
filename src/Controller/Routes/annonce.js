const express = require("express");
const {
  createAnnonce,
  getAllAnnonce,
  deleteAnnonceById,
  patchAnnonce,
} = require("../AnnonceController");
const annonce = express.Router();

annonce.post("/create", createAnnonce);
annonce.get("/all", getAllAnnonce);
annonce.delete("/delete/:id", deleteAnnonceById);
annonce.patch("/update", patchAnnonce);
module.exports = annonce;
