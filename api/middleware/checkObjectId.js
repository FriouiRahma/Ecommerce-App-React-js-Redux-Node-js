const mongoose = require("mongoose");
// middleware to check for a valid object id
const checkObjectId = (idToCheck) => (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params[idToCheck]))
    return res.status(400).json({ msg: "Invalid ID" });
  next();
};
// hedha el middelware eli 9otlk 3lih testitou rake7 bien sa7it
module.exports = checkObjectId;
