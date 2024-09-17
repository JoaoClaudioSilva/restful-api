# PROJETO INDIVIDUAL - BACKEND

## Descrição

Este projeto é uma API RESTful que permite o gerenciamento de uma rede de lojas. Ela oferece funcionalidades para gerenciar produtos, lojas e estoques, fornecendo operações CRUD para cada um desses recursos.


## Funcionalidades

### Gerenciamento de usuários

- Criação: Novos usuários podem se registrar para acessar recursos.
- Autenticação: Geração de tokens JWT que garantem segurança ao acesso de rotas protegidas apenas a usuários autorizados.
- Administração: Administradores podem alterar, excluir e conceder acesso de administrador a usuários.

### Gerenciamento de dados

- Operações CRUD: Criação, leitura, atualização e deleção dos dados.
- Listagem: Todas as tabelas e/ou dados com opções de filtragem e paginação.
- Controle: Baseado em permissões por autenticação de token JWT.

## Tecnologias Utilizadas

- Linguagem: Javascript
- Framework: Express
- Banco de dados: PostgreSQL
- Hosting: Vercel

## Acesso

Este branch do projeto está hospedado. Acesse pelo link: https://joaoc-restful-api.vercel.app/docs/

## Endpoints
> Este é apenas um sumário dos caminhos disponíveis. A documentação completa dos recursos pode ser acessada no endpoint /docs  
### Recursos de gerenciamento de usuários

- Acessíveis por usuários
  
| Método | Endpoint              | Descrição                         |
|--------|-----------------------|-----------------------------------|
| POST   | /users/register       | Cria um usuário                   |
| POST   | /uses/login           | Gera um token JWT para login      |
| PUT    | /users                | Atualiza dados pessoais           |

- Acessíveis por administradores
  
| Método | Endpoint              | Descrição                                       |
|--------|-----------------------|-------------------------------------------------|
| PUT    | /admins/create/{nome} | Concede privilégios de administrador ao usuário |
| PUT    | /admins/update/{nome} | Altera as credenciais de um usuário             |
| DELETE | /admins/{nome}        | Exclui um usuário                               |


### Recursos de acesso aos dados
| Método | Endpoint              | Descrição                                                      |
|--------|-----------------------|----------------------------------------------------------------|
| GET    | /install              | Instala a configuração inicial do banco de dados               |
| POST   | /data/{modelo}        | Cria uma nova tupla na tabela-modelo                           |
| GET    | /data/{modelo}        | Retorna todos os dados da tabela-modelo                        |
| GET    | /data/{modelo}/search | Retorna os dados da tabela-modelo, de acordo com o filtro      |
| GET    | /data/{modelo}/{id}   | Retorna a tupla com o id selecionado da tabela-modelo          |
| PUT    | /data/{modelo}/{id}   | Altera os dados da tupla com o id selecionado da tabela-modelo |
| DELETE | /data/{modelo}/{id}   | Exclui a tupla com o id selecionado da tabela-modelo           |


## Licença
Este projeto está licenciado sob a licença MIT.
