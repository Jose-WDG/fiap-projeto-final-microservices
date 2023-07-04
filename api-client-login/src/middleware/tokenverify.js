const jwt = require("jsonwebtoken");
const config = require("../config/seting");

function verifyToken(req, res, next) {
    let token_enviado = req.body.token || req.query.token || req.headers['authorization'];

    if (!token_enviado) {
        return res.status(401).send({
            output: `Não existe token. Realize o processo de login`
        });
    }
    if (token_enviado.startsWith('Bearer ')) {
        token_enviado = token_enviado.slice(7, token_enviado.length);
    }
    jwt.verify(token_enviado, config.jwt_secret, (err, result) => {
        if (err) {
            return res.status(500).send({ output: `Erro interno->${err}` })
        };
        req.content = {
            id: result._id,
            usuario: result.nomeusuario,
            email: result.email
        }
        return next();
    });
}
module.exports = verifyToken;