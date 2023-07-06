# fiap-projeto-final-microservices

Projeto para o MBA Fiap para a matéria de microservices

## Atividade

Atividade para alunos da Fiap.

O aluno deve desenvolver duas estruturas de backend, sendo a primeira para cadastrar usuários, que devem conter os seguintes campos: nomeusuario, email, senha, nomecompleto, telefone, datacadastro. Nesta estrutura devem ser implementadas as seguintes ações:

- Cadastrar usuário;
- Criptografar a senha;
- Autenticar usuário;
- Gerar o token JWT;
- Gerar uma apikey;
- Alterar senha.

Para a segunda parte da atividade, o aluno deve criar uma estrutura para cadastrar e atualizar informações financeiras dos usuários. Neste projeto, o aluno deve construir o código de tal forma que, ao tentar cadastrar ou atualizar os dados financeiros dos usuários, seja requisitado o token gerado na autenticação do primeiro serviço. As informações financeiras só poderão ser cadastradas e/ou atualizadas se houver um token válido. Os dados financeiros são:

- nome_banco, tipo_conta, nome_titular, limite_cartao, apikey.

*Utilize o banco de dados MongoDB para os dois serviços.

Ao finalizar a atividade, o aluno deve realizar a entrega via sistema Fiap, publicar os dois projetos no seu GitHub e enviar o link do repositório.

# Executar

Este projeto consiste em duas APIs: API de login, API de registros financeiros e MongoDB. É necessário que todas estejam em execução para o correto funcionamento do sistema.

## Pré-requisitos

- Docker instalado no ambiente
- Conta no MongoDB Cloud (recomendado para ambiente de produção)
- MongoDB para ambiente de desenvolvimento no Docker

## Executar projeto completo

Para executar o projeto, basta acessar a pasta `/fiap-projeto-final-microservices` e executar o comando `docker-compose up`. Para gerenciar o MongoDB, foi usado o MongoDB Express, que pode ser acessado em http://localhost:8081/.

## Executando a API de login

1. Navegue até a pasta `api-client-login`.
2. Execute o comando `docker-compose up` para iniciar o serviço.

## Executando a API de registros financeiros

1. Navegue até a pasta `api-client-financial`.
2. Execute o comando `docker-compose up` para iniciar o serviço.

## Autenticação

Algumas requisições exigem autenticação do cliente. É necessário incluir as seguintes informações no header, body ou params:

- `Authorization`: Token JWT gerado para o cliente autenticado.
- `Apikey`: Chave de API do cliente que gerou o token JWT.

## Configurações de ambiente

Crie um arquivo `.env` na raiz de cada projeto, conforme as configurações abaixo.

### Arquivo .env para a API de login

DEV_DB_URL=mongodb://root:root@user-db:27017/
DB_HOST=<host do banco>
DB_NAME=<Nome do banco>
DB_USER=<Usuário do banco>
DB_PASS=<Senha do banco>
PORT=4000
HOST=http://127.0.0.1
KEY_JWT=<chave-jsonwebtoken>
NODE_ENV=development (por padrão)

### Arquivo .env para a API de registros financeiros

DEV_DB_URL=mongodb://root:root@user-db:27017/
DB_HOST=<host do banco>
DB_NAME=<Nome do banco>
DB_USER=<Usuário do banco>
DB_PASS=<Senha do banco>
PORT=3000
HOST=http://127.0.0.1
KEY_JWT=<chave-jsonwebtoken>
NODE_ENV=development (por padrão)


## Ambientes

- `production`: Utilize este ambiente para conectar-se ao MongoDB na nuvem (MongoDB Cloud).
- `development`: Utilize este ambiente para conectar-se ao MongoDB executado localmente no Docker.

Certifique-se de preencher as informações corretas de conexão com o banco de dados nos arquivos `.env` para cada ambiente.

Agora você está pronto para executar o projeto e utilizar as APIs de login e registros financeiros. Certifique-se de ter configurado corretamente as dependências e os ambientes para um funcionamento adequado.
