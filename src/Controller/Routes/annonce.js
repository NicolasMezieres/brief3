const express = require("express");
const { createAnnonce, getAllAnnonce } = require("../AnnonceController");
const annonce = express.Router();

annonce.post("/create", createAnnonce);
annonce.get("/all", getAllAnnonce);
module.exports = annonce;
