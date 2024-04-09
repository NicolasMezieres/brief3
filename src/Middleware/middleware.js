const validator = require("validator");

const middleURL = async (req, res, next) => {};
const middleId = async (req, res, next) => {
  let idBody = req.body.idUser;
  let idParams = req.params.id;
  let uniqueId = req.body._id;
  if (
    (!validator.isMongoId(idBody + "") && idBody) ||
    (!validator.isMongoId(idParams + "") && idParams) ||
    (!validator.isMongoId(uniqueId + "") && uniqueId)
  ) {
    return res.json({ message: "please send a mongoid" });
  }
  next();
};

module.exports = { middleId };
