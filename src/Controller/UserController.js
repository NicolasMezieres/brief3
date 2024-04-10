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
  try {
    let foundUser = await client
      .db("BKN")
      .collection("user")
      .findOne({ email: req.body.email });
    if (foundUser) {
      res.status(401).json({ error: "email already use" });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

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
async function isAdmin(req, res) {
  let id = req.body.id;
  let uniqueId = new ObjectId(id);
  if (!id) {
    return res.status(400).json({ error: "invalid" });
  }
  try {
    let isAdminUser = await client
      .db("BKN")
      .collection("user")
      .findOne({ _id: uniqueId });
    let result = await isAdminUser;
    if (!result) {
      return res.status(404).json({ error: "not found" });
    }
    if (result.role === "admin") {
      return res.status(200).json({ msg: "vous êtes admin" });
    }
    res.status(401).json({ error: "not authorized" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ e: e });
  }
}

async function getAllUser(req, res) {
  console.log(req.url);
  try {
    let apiCall = await client.db("BKN").collection("user").find();
    let response = await apiCall.toArray();
    console.log(response);
    res.status(200).json(response);
  } catch (e) {
    console.log(e);
    res.status;
  }
}
async function getUserByEmail(request, response) {
  let email = request.body.email;
  try {
    let userInfo = await client
      .db("BKN")
      .collection("user")
      .findOne({ email: email });
    let result = await userInfo;
    if (!result) {
      response.status(404).json({ error: "Not found" });
      return;
    }
    response.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error });
  }
}
module.exports = {
  register,
  login,
  getUserById,
  getAllUser,
  isAdmin,
  getUserByEmail,
};
