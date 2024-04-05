const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const { connect } = require("./Services/Connexion");
const userRoute = require("./Controller/Routes/user");
const annonceRoute = require("./Controller/Routes/annonce");
let port = 3000;

connect("mongodb://localhost:27017", (error) => {
  if (error) {
    console.log("Failed to connect");
    process.exit(-1);
  } else {
    console.log("connected");
  }
});
app.use("/user", userRoute);
app.use("/annonce", annonceRoute);
app.listen(port);
console.log("test");
