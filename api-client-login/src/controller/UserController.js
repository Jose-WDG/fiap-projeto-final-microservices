const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/seting')
const User = require('../models/user');
const gerarToken = require('../utils/generatetoken');
const { use } = require('../routes/UserRoutes');

class UserController {
    // Cadastrar usuário
    async registerUser(req, res) {
        const { nomeusuario, senha, email, nomecompleto, telefone } = req.body;
        try {
            User.findOne({ email: email }).then((existingUser) => {
                // Verificar se o usuário já existe
                if (existingUser) {
                    return res.status(400).json({ error: 'Usuário já cadastrado' });
                }

                // Criptografar a senha
                bcrypt.hash(senha, config.bcrypt_salt, (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: `Erro ao gerar a senha ->${erro}` });
                    }

                    // Gerar uma API Key
                    bcrypt.genSalt(10).then((newApiKey) => {
                         // Criar o novo usuário
                        const newUser = new User({
                            nomeusuario,
                            email,
                            senha: result,
                            nomecompleto,
                            telefone,
                            apikey: newApiKey,
                        });
    
                        // Salvar o novo usuário no banco de dados
                        newUser.save().then((userSave) => res.status(201).json({ output: "sucesso", payload: userSave }));
                    }
                    );
                });
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: `Erro ao salvar -> ${error.message}` });
        }
    }

    // Autenticar usuário
    async authenticateUser(req, res) {
        const { email, senha } = req.body;
        console.log("APILOG: e-mail: " + email + " - senha" + senha)
        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ email: email });
            console.log(user)
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }

            // Verificar se a senha é válida
            const secreteKeyMath = await bcrypt.compare(senha, user.senha)
            if (!secreteKeyMath) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            // Gerar token com JWT
            const token = gerarToken(user._id, user.nomeusuario, user.email);

            res.status(200).json({ output: `Autenticado`, token: token, apikey: user.apikey });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: `Erro ao autenticar usuário -> ${err.message}` });
        }
    }

    // Alterar senha
    async changePassword(req, res) {
        const { email, senhaAntiga, novaSenha } = req.body;
        const apiKey = req.body.apikey || req.query.apikey || req.headers['apikey'];
        console.log(`body : ${req.body}`)
        console.log(`apikey req: ${apiKey}`)
        
        try {
            // Verificar se o usuário existe
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }
            console.log(`apikey user: ${user.apikey}`)
            // Verificar se a senha antiga é válida
            const passwordMatch = await bcrypt.compare(senhaAntiga, user.senha);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Senha antiga inválida' });
            }

           //verifica ApiKey
           bcrypt.compare(apikey, user.apikey).then((apikeyIsValid) => {
            if (apikeyIsValid) {
                return res.status(403).json({ error: 'ApiKey é invalido' });
            }
        });

            // Criptografar a senha
            bcrypt.hash(novaSenha, config.bcrypt_salt, (err, result) => {
                if (err) {
                    return res.status(500).send({ output: `Erro ao gerar a senha ->${erro}` });
                }
                // Atualizar a senha do usuário
                user.senha = result;
                user.save().then(() => res.status(200).json({ message: 'Senha alterada com sucesso' }))
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: `Erro ao alterar a senha -> ${err.message}` });
        }
    }

    // Deleta usuário
    async deleteUser(req, res) {
        User.findByIdAndDelete(req.params.id).then((result) => {
            res.status(204).json({ output: "ok", payload: result });
        }).catch((erro) => {
            console.log(`Erro ao gerar a senha ->${erro}`)
            res.status(401).json({ error: `Não foi possivel deletar o usuário -> ${erro.message}` });
        });
    }

    // Consultar usuários
    async findAll(req, res) {
        User.find().select("-senha").then((result) => {
            res.status(200).json({ output: "ok", payload: result });
        }).catch((erro) => {
            res.status(500).json({ output: `Erro ao processar dados -> ${erro}` });
        });
    }

    // Pegar usuário
    async findUserById(req, res) {
        User.findById(req.body.idUsuario).then((user) => {
            res.status(200).json({ payload: user })
        }).catch((error) => res.status(500).json({ error: `Erro ao processar dados -> ${error}` }));
    }
}


module.exports = new UserController();
