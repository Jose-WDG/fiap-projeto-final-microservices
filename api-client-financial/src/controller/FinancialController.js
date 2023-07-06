const Financial = require('../models/financial');
const UserDataBase = require('../models/user');
const bcrypt = require('bcrypt');

class FinancialController {
    async updateFinancialInfo(req, res) {
        try {
            const { nome_banco, tipo_conta, limite_cartao } = req.body;
            const user = await UserDataBase.findById(req.content.id);

            console.log(`Usuário encontrado: ${user}`)
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            Financial.findOne({ userId: user._id }).then((result) => {
                result.nome_banco = nome_banco;
                result.tipo_conta = tipo_conta;
                result.nome_titular = user.nomecompleto;
                result.limite_cartao = limite_cartao;

                result.save();

                res.status(200).json({ success: 'Informações financeiras atualizadas com sucesso' });
            });

        } catch (error) {
            res.status(500).json({ error: `Erro ao atualizar informações financeiras -> ${error.message}` });
        }
    }

    async registerFinancialInfo(req, res) {
        try {
            const { nome_banco, tipo_conta, limite_cartao } = req.body;

            UserDataBase.findById(req.content.id).then((user) => {
                if (!user) {
                    return res.status(401).json({ error: 'Usuário não encontrado' });
                }

                Financial.findOne({ userId: user._id }).then((result) => {
                    if (result) {
                        return res.status(401).json({ error: 'Informações financeiras já cadastrada' });
                     }
     
                     const newFinance = new Financial({
                         nome_banco,
                         tipo_conta,
                         nome_titular: user.nomecompleto,
                         limite_cartao,
                         apiKey: user.apikey,
                         userId: user._id,
                     });
     
                     newFinance.save().then((result) => res.status(201).json({ success: 'Informações financeiras cadastradas com sucesso', payload: result }));
                })
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao cadastrar informações financeiras' });
        }
    }

    async getFinancialInfo(req, res) {
        try {
            UserDataBase.findById(req.content.id).then((user) => {
                if (!user) {
                    return res.status(401).json({ error: 'Usuário não encontrado ou token inválido' });
                }

                Financial.findOne({ userId: user._id }).then((result) => {
                    if (result) {
                        res.status(200).json({ success: 'Informações financeiras obtidas com sucesso', payload: result });
                    } else {
                        res.status(404).json({ error: 'Informações financeiras não encontradas' });
                    }
                });
            });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao obter informações financeiras' });
        }
    }

    // Consultar todas informações financeiras
    async findAll(req, res) {
        Financial.find().then((result) => {
            res.status(200).json({ output: "ok", payload: result });
        }).catch((erro) => {
            res.status(500).json({ output: `Erro ao processar dados -> ${erro}` });
        });
    }

    // Deletar Informações financeiras
    async deleteFinancial(req, res) {
        Financial.findByIdAndDelete(req.params.id).then((result) => {
            return res.status(204).json({ output: "ok", payload: result });
        }).catch((error) => {
            console.log(`Erro ao deletar informações financeiras ->${error}`)
            res.status(401).json({ error: `Não foi possivel deletar as informações financeiras -> ${error.message}` });
        });
    }

}

module.exports = new FinancialController();