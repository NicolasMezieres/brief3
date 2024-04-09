const { User } = require("../Models/User");
const client = require("../Services/Connexion");
const bcrypt = require("bcrypt");
const { ObjectId } = require("bson");

const register = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  let user = await client
    .db("BKN")
    .collection("user")
    .findOne({ email: req.body.email });
  if (user) {
    res.status(401).json({ error: "email already use" });
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  try {
    let user = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword,
      "user",
      new Date(),
      true
    );
    let result = await client.db("BKN").collection("user").insertOne(user);
    res.status(201).json({ result });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

async function login(req, res) {
  if (!req.body.password || !req.body.email) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  try {
    let user = await client
      .db("BKN")
      .collection("user")
      .findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json({ error: "email or password invalid" });
      return;
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      res.status(401).json({ error: "email or password invalid" });
      return;
    }
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
}
async function getUserById(req, res) {
  try {
    let id = new ObjectId(req.params.id);
    let apiCall = await client
      .db("BKN")
      .collection("user")
      .findOne({ _id: id });
    let response = await apiCall;
    res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
    return;
  }
}
async function getAllUser(req, res) {
  try {
    let apiCall = await client.db("BKN").collection("user").find();
    let response = await apiCall.toArray();
    res.status(200).json({ response });
  } catch (e) {
    console.log(e);
    res.status;
  }
}
module.exports = { register, login, getUserById, getAllUser };
