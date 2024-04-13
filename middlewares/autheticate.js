// middlewares/authenticate.js
const { verifyToken } = require("./helpers/jwtHelper");

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticate;
