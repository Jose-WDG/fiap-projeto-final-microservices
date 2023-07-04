const mongoose = require("../database/conection");

const schema = new mongoose.Schema({
    nome_banco: String,
    tipo_conta: String,
    nome_titular: String,
    limite_cartao: Number,
    apikey: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});

const Financial = mongoose.model("Financial", schema);

module.exports = Financial
;
