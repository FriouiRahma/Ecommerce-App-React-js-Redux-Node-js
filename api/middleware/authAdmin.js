const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify the token

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    if (decoded.user.role === "1") {
      req.user = decoded.user;
      next();
    } else {
      res.status(401).json({ msg: "Not Admin" });
    }
  } catch (err) {
    res.status(401).json({ msg: "Token is no valid" });
  }
};
