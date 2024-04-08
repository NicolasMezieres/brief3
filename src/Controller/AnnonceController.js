const { Annonce } = require("../Models/Annonce");
const client = require("../Services/Connexion");
const { ObjectId } = require("bson");

// id user
async function createAnnonce(req, res) {
  if (
    !req.body.titre ||
    !req.body.image ||
    !req.body.description ||
    !req.body.id
  ) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  let uniqueId = new ObjectId(req.body.id);
  let searchUser = await client
    .db("BKN")
    .collection("user")
    .findOne({ _id: uniqueId });
  let foundUser = await searchUser;
  console.log(foundUser);
  if (!foundUser) {
    res.status(404).json({ error: "not found test " });
    return;
  }
  try {
    let newAnnonce = new Annonce(
      req.body.titre,
      req.body.image,
      req.body.description,
      req.body.id
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
async function patchAnnonce(req, res) {
  try {
    let annonce = {
      ...req.body,
    };
    let uniqueId = new ObjectId(annonce._id);
    let titre = annonce.titre;
    let image = annonce.image;
    let description = annonce.description;
    let id = annonce.id;
    let patch = await client
      .db("BKN")
      .collection("annonce")
      .updateOne(
        { _id: uniqueId },
        {
          $set: {
            titre: titre,
            image: image,
            description: description,
            id: id,
          },
        }
      );
    if (patch.modifiedCount === 1) {
      res.status(200).json({ msg: "Modification effectuer" });
    } else if (patch.matchedCount === 1) {
      res.json({ msg: "Aucune modification" });
    } else {
      res.status(404).json({ msg: "Cette annonce n'existe pas" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
async function deleteAnnonceById(req, res) {
  try {
    let apiCall = await client
      .db("BKN")
      .collection("annonce")
      .deleteOne({ id: req.params.id });
    let response = await apiCall;
    if (response.deletedCount === 1) {
      res.status(200).json({
        msg: "Supprésion réussie!",
      });
    } else {
      res.status(500).json({
        msg: "Suppréssion impossible!",
      });
    }
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  createAnnonce,
  getAllAnnonce,
  deleteAnnonceById,
  patchAnnonce,
};
