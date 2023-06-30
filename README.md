# fiap-projeto-final-microservices
Projeto para o MBA Fiap para matéria de microservices

## Atividade:

Atividade para alunos da Fiap 

O aluno deve desenvolver duas estruturas de backend , sendo a primeira para cadastrar usuários, onde este deva conter os seguintes campos: nomeusuario, email, senha, nomecompleto, telefone, datacadastro. Nesta estrutura deve haver as seguintes ações: 
 - cadastrar usuario; 
 - criptografar a senha; 
- autenticar usuário; 
 - gerar o token com jwt; 
- gerar uma apikey;
 - alterar senha. 

Para a segunda parte da atividade, o aluno deve criar uma estrutura para cadastrar e atualizar informações financeiras dos usuários. Neste projeto o aluno deve construir o código de tal forma que ao tentar cadastrar ou atualizar os dados os usuários, será requisitado o token gerado na autenticação do primeiro serviço. As informações financeiras só poderão ser cadastras e/ou atualizadas se houver um token válido. Os dados financeiros serão: 
 - nome_banco, tipo_conta, nome_titular, limite_cartao, apikey. 

*Utilize o banco de dados MongoDB para os dois serviços. 

Ao finalizar a atividade o aluno deve realizar a entrega via sistema fiap, publicar os dois projetos no seu github e enviar o link do repositório no email: profedilson.silva@fiap.com.br 

Boa Sorte!
