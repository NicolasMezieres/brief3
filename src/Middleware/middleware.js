const validator = require("validator");

const middleEmail = async (req, res, next) => {
  let email = req.body.email;
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "please send a email" });
  }
  next();
};
const middleURL = async (req, res, next) => {
  let url = req.body.image;
  if (!validator.isURL(url)) {
    return res.status(400).json({ error: "please send a url" });
  }
  next();
};
const middleId = async (req, res, next) => {
  let idBody = req.body.idUser;
  let idParams = req.params.id;
  let uniqueId = req.body._id;
  if (
    (!validator.isMongoId(idBody + "") && idBody) ||
    (!validator.isMongoId(idParams + "") && idParams) ||
    (!validator.isMongoId(uniqueId + "") && uniqueId)
  ) {
    return res.status(400).json({ error: "please send a mongoid" });
  }
  next();
};

module.exports = { middleId, middleURL, middleEmail };
