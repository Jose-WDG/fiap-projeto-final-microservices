const jwt = require("jsonwebtoken");
const config = require("../config/seting");

function generatetoken(id, usuario, email, apiKey) {
  return jwt.sign(
    { idusuario: id, nomeusuario: usuario, email: email, apiKey: apiKey, autenticado: true },
    config.jwt_secret,
    { expiresIn: config.jwt_expires }
  );
}

module.exports = generatetoken;
