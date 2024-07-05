const { QueryError } = require("sequelize")
const Usuario = require("../models/model_usuario")
const { validaUsuario } = require("../validators/validator_usuario")
const { ValidationError } = require("joi")

module.exports = {
  /**
   * Registra um novo usuário no sistema
   * @param {string} nome   Nome do usuário a ser criado
   * @param {string} senha  Senha do usuário a ser criado
   * 
   * @returns {JSON}      Tupla criada do usuário
   * 
   * @throws  Erro de validação do usuário 
   */
  criaUsuario: async (nome, senha) => { 
    const resultado = validaUsuario({ nome: nome, senha: senha })    

    if(!resultado.error){
      return await Usuario.create({ nome: nome, senha: senha })
    } else {
      throw new ValidationError(resultado.error)
    }
  },

  /**
   * Entra com um usuário no sistema
   * @param {string} nome   Nome do usuário a ser logado
   * @param {string} senha  Senha do usuário a ser logado
   * 
   * @returns {JSON}      Tupla do usuário logado
   * 
   * @throws Erro de ausência de parâmetros
   */
  logaUsuario: async (nome, senha) => {
    if(!nome || !senha) throw new QueryError("Campos 'nome' e 'senha' são obrigatórios")

    return await Usuario.findOne({ where: { nome: nome, senha: senha }})
  },

  /**
   * Altera um usuário no sistema
   * @param {JSON} filter   Objeto com as restrições de busca
   * @param {JSON} data     Objeto com os novos valores do usuário a ser atualizado
   * 
   * @returns {Array}       Quantidade de linhas alteradas
   */
  alteraUsuario: async (filter, data) => {
    return await Usuario.update(data, { where: filter })
  },

  /**
   * Exclui um usuário do sistema
   * @param {string} nome Nome do usuário a ser excluído
   * 
   * @returns {Array}     Quantidade de linhas alteradas
   */
  excluiUsuario: async (nome) => {
    return await Usuario.destroy({ where: { nome: nome, isAdmin: false }})
  },
}