const { Annonce } = require("../Models/Annonce");
const client = require("../Services/Connexion");
const { ObjectId } = require("bson");

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
    res.status(200).json({
      annonces,
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: e });
  }
}
async function getAnnonceById(req, res) {
  let id = req.params.id;
  if (!id) {
    res.status(404).json({ msg: "erreur" });
  }
  try {
    let foundAnnonce = await client
      .db("BKN")
      .collection("annonce")
      .findOne({ id: id });
    let result = await foundAnnonce;
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
async function compareUserId(req, res) {
  let idUser = req.body.idUser;
  let idUserUnique = new ObjectId(req.body.idUser);
  let idAnnonce = req.body.idAnnonce;
  if (!idUser || !idAnnonce) {
    return res.status(401).json({ error: "error" });
  }
  try {
    let foundUser = await client
      .db("BKN")
      .collection("user")
      .findOne({ _id: idUserUnique });
    let responseFoundUser = await foundUser;
    if (!responseFoundUser) {
      return res.status(404).json({ error: "not found" });
    }
    let foundAnnonce = await client
      .db("BKN")
      .collection("annonce")
      .findOne({ id: idAnnonce });
    let responseAnnonce = await foundAnnonce;
    if (
      responseAnnonce.idUser === idUser ||
      responseFoundUser.role === "admin"
    ) {
      res.status(200).json({ msg: "vous êtes l'auteur de l'annonce" });
      return;
    }
    res.status(404).json({ msg: "vous n'êtes pas l'auteur de l'annonce" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e });
  }
}
async function patchAnnonce(req, res) {
  try {
    let findAnnonce = await client
      .db("BKN")
      .collection("annonce")
      .findOne({ id: req.body.id });
    const annonce = {
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
  let idAnnonce = req.body.id;
  let idUser = req.body.idUser;
  let idUserUnique = new ObjectId(idUser);
  if (!idUser || !idAnnonce) {
    return res.status(400).json({ msg: "invalid" });
  }
  try {
    let findUser = await client
      .db("BKN")
      .collection("user")
      .findOne({ _id: idUserUnique });
    let responseFindUser = await findUser;
    if (!responseFindUser) {
      return res.status(404).json({ msg: "not found" });
    }
    let findAnnonce = await client
      .db("BKN")
      .collection("annonce")
      .findOne({ id: idAnnonce });
    let responseFindAnnonce = await findAnnonce;
    if (!findAnnonce) {
      return res.status(404).json({ msg: "not found" });
    }
    if (
      idUser === responseFindAnnonce.idUser ||
      responseFindUser.role === "admin"
    ) {
      let deleteAnnonce = await client
        .db("BKN")
        .collection("annonce")
        .deleteOne({ id: idAnnonce });
      let response = await deleteAnnonce;

      if (response.deletedCount === 1) {
        return res.status(200).json({
          msg: "Supprésion réussie!",
        });
      } else {
        return res.status(500).json({
          msg: "Suppréssion impossible!",
        });
      }
    } else {
      return res.status(401).json({ msg: "not authorized" });
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
  getAnnonceById,
  compareUserId,
};
