const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/seting')
const User = require('../models/user');
const gerarToken = require('../utils/generatetoken');

class UserController {
    // Cadastrar usuário
    async registerUser(req, res) {
        const { nomeusuario, senha, email, nomecompleto, telefone } = req.body;
        
        try {
            // Verificar se o usuário já existe
            const existingUser = await User.findOne({ nomeusuario: nomeusuario });
            if (existingUser) {
                return res.status(400).json({ error: 'Usuário já cadastrado' });
            }

            // Criptografar a senha
            const secreteKeyHashed = bcrypt.hash(senha, config.bcrypt_salt, (err, result) => {
                if(err){
                    return res.status(500).send({output: `Erro ao gerar a senha ->${erro}`});
                }
                return result;
            });

            // Criar o novo usuário
            const newUser = new User({
                nomeusuario,
                email,
                senha: secreteKeyHashed,
                nomecompleto,
                telefone
            });

            // Salvar o novo usuário no banco de dados
            await newUser.save();

            res.status(201).json(newUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    }

    // Autenticar usuário
    async authenticateUser(req, res) {
        const { email, senha } = req.body;

        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            // Verificar se a senha é válida
            const passwordMatch = await bcrypt.compare(senha, user.senha);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            // Gerar token com JWT
            const token = gerarToken(user._id, user.nomeusuario, user.email);

            res.status(200).send({ output: `Autenticado`, token: token, user: result });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    }

    // Gerar uma API Key
    generateApiKey(req, res) {
        const apiKey = Math.random().toString(36).substr(2, 10);

        return res.status(200).json({ apiKey });
    }

    // Alterar senha
    async changePassword(req, res) {
        const { email, senhaAntiga, novaSenha } = req.body;

        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            // Verificar se a senha antiga é válida
            const passwordMatch = await bcrypt.compare(senhaAntiga, user.senha);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Senha antiga inválida' });
            }

            // Criptografar a nova senha
            const hashedPassword = await bcrypt.hash(novaSenha, 10);

            // Atualizar a senha do usuário
            user.senha = hashedPassword;
            await user.save();

            res.status(200).json({ message: 'Senha alterada com sucesso' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro ao alterar a senha' });
        }
    }

    // Deleta usuário
    async deleteUser(req, res){
        User.findByIdAndDelete(req.params.id).then((result) => {
            res.status(204).send({ payload: result });
        }).catch((erro) => {
            console.log(`Erro ao gerar a senha ->${erro}`)
            res.status(401).json({ error: `Não foi possivel deletar o usuário -> ${erro.message}` });
        });
    }

    // Consultar usuários
    async find(req, res){
        User.find().select("-senha").then((result) => {
            res.status(200).send({ output: "ok", payload: result });
        }).catch((erro) => {
            res.status(500).send({ output: `Erro ao processar dados -> ${erro}` });
        });
    }
}


module.exports = new UserController();
