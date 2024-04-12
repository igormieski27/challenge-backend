// middlewares/authenticate.js
const { verifyToken } = require("./helpers/jwtHelper");

function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
    const decoded = verifyToken(token);
    req.user = decoded; // Adiciona dados do usuário decodificados ao objeto de requisição
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = authenticate;
