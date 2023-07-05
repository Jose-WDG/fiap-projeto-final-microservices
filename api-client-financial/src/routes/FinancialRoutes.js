const express = require('express');
const Financial = require('../models/financial');
const router = express.Router();
const UserDataBase = require('../models/user');
const verificarToken = require('../middleware/VerifyToken');
const bcrypt = require('bcrypt');

router.put('/finance', verificarToken, async (req, res) => {
  try {
    const { nome_banco, tipo_conta, nome_titular, limite_cartao, apikey } = req.body;
    const user = await UserDataBase.findById(req.content.idusuario);

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Verificar ApiKey
    bcrypt.compare(apikey, user.apikey).then((apikeyNotIsValid) => {
      if (!apikeyNotIsValid) {
        Financial.findOne({ userId: user._id }).then((result) => {
          result.nome_banco = nome_banco;
          result.tipo_conta = tipo_conta;
          result.nome_titular = nome_titular;
          result.limite_cartao = limite_cartao;

          result.save();
          cliente.financial = existingInfo;
          cliente.save();

          res.status(200).json({ message: 'Informações financeiras atualizadas com sucesso' });
        });
      } else {
        res.status(403).json({ error: 'ApiKey inválida' });
      }
    });

    console.log(user);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar informações financeiras' });
  }
});

router.post('/finance', verificarToken, async (req, res) => {
  try {
    const { nome_banco, tipo_conta, limite_cartao, apikey } = req.body;

    UserDataBase.findById(req.content.id).then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
      }

      // Verificar ApiKey
      bcrypt.compare(apikey, user.apikey).then((apikeyNotIsValid) => {
        if (!apikeyNotIsValid) {
          const newFinance = new Financial({
            nome_banco,
            tipo_conta,
            nome_titular: user.nomecompleto,
            limite_cartao,
            apikey,
            userId: user._id,
          });

          newFinance.save().then((result) => res.status(201).json({ message: 'Informações financeiras cadastradas com sucesso', payload: result }));
        } else {
          res.status(403).json({ error: 'ApiKey inválida' });
        }
      });
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Erro ao cadastrar informações financeiras' });
  }
});

router.get('/finance', verificarToken, async (req, res) => {
  try {
    UserDataBase.findById(req.content.id).then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado ou token inválido' });
      }

      Financial.findOne({ userId: user._id }).then((result) => {
        if (result) {
          res.status(200).json({ message: 'Informações financeiras obtidas com sucesso', payload: result });
        } else {
          res.status(404).json({ error: 'Informações financeiras não encontradas' });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter informações financeiras' });
  }
});

router.use((_, res) => {
  res.type("application/json");
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

module.exports = router;