const { ValidationError } = require("joi")
const modelos = require("../models/model_database")
const { validaDados } = require("../validators/validator_database")


module.exports = {
  /**
   * Adiciona uma tupla ao banco de dados
   * @param {string} modelo   Nome do modelo da tabela no banco de dados
   * @param {JSON} data       Objeto da tupla a ser criada
   * 
   * @returns {JSON}        Tupla criada no banco de dados
   * 
   * @throws  Erro de validação da tupla
   */
  criaTupla: async (modelo, data) => {
    const resultado = validaDados(modelo, data)

    if(!resultado.error) {
      return await modelos[modelo].create(data)
    } else {
      throw new ValidationError(resultado.error)
    }
  },

  /**
   * Busca uma ou várias tuplas no banco de dados
   * @param {string} modelo               Nome do modelo da tabela
   * @param {JSON} filter                 Objeto com as restrições de busca
   * @param {Array<string> | undefined} ordem     Opção de ordenação de uma coluna ascendente ou descendente, ordenação padrão se undefined
   * @param {number | null} limite               Quantidade de resultados retornados
   * @param {number | null} pagina               Paginação do resultado
   *                                      
   * @returns {JSON}        JSONs das tuplas encontradas
   */
  leTupla: async (modelo, filter, ordem, limite, pagina) => {
    return await modelos[modelo].findAll({ where: filter, rejectOnEmpty: true, order: ordem, offset: pagina, limit: limite })
  },


  /**
   * Altera uma tupla no banco de dados
   * @param {string} modelo   Nome do modelo da tabela
   * @param {number} id       Chave primária da tupla a ser atualizada     
   * @param {JSON} data       Objeto com os novos valores da tupla a ser atualizada   
   * 
   * @returns {Array}         Quantidade de linhas modificadas
   */
  atualizaTupla: async (modelo, id, data) => {
    return modelos[modelo].update(data, { where: { id: id } })
  },

  /**
   * Exclui uma tupla do banco de dados
   * @param {string} modelo Nome do modelo da tabela
   * @param {number} id     Chave primária da tupla a ser excluída         
   *  
   * @returns {Array}       Quantidade de linhas modificadas
   */
  excluiTupla: async (modelo, id) => {
    return await modelos[modelo].destroy({ where: { id: id } })
  },
  
  /**
   * Busca uma tabela no banco de dados
   * @param {string} modelo Nome do modelo da tabela
   * 
   * @returns {JSON}     JSONs das tuplas encontradas
   */
  leTabela: async (modelo) => {
    return await modelos[modelo].findAll()
  }
}