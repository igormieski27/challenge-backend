const jwt = require("jsonwebtoken");
const secretKey = "grupoa_projeto2024_fullstack";

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, secretKey, {
    expiresIn: "24h",
  });
}

function verifyToken(token) {
  return jwt.verify(token, secretKey);
}

module.exports = { generateToken, verifyToken };
