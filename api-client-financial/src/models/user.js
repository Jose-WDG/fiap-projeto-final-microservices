const mongoose = require('../database/conection');

const UserSchema = new mongoose.Schema({
  nomeusuario: String,
  email: String,
  senha: String,
  nomecompleto: String,
  telefone: String,
  datacadastro: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

module.exports = User