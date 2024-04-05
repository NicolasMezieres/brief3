const { Annonce } = require("../Models/Annonce");
const client = require("../Services/Connexion");
const { ObjectId } = require("bson");

// id user
async function createAnnonce(req, res) {
  if (
    !req.body.titre ||
    !req.body.image ||
    !req.body.description ||
    !localStorage.getItem("_id")
  ) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  try {
    let newAnnonce = new Annonce(
      req.body.titre,
      req.body.image,
      req.body.description,
      localStorage.getItem("_id")
    );
    let annonce = await client
      .db("BKN")
      .collection("annonce")
      .insertOne(newAnnonce);
    res.status(201).json({ annonce });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}

async function getAllAnnonce(req, res) {
  try {
    let apiCall = await client.db("BKN").collection("annonce").find();
    let annonces = await apiCall.toArray();
    res.status(200).json({ annonces });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
}
async function deleteAnnonce(req, res) {}
module.exports = { createAnnonce, getAllAnnonce };
