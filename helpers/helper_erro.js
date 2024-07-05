const { UniqueConstraintError, QueryError, EmptyResultError, DatabaseError } = require("sequelize")
const { ValidationError } = require("joi")

module.exports = {
  /**
   * @param {Express.Response} res Objeto da resposta
   * @param {Error} err Erro gerado durante a execução
   * 
   * @returns {void}
   */
  errorHandler: (res, err) => {

    if(err instanceof EmptyResultError)
      res.status(404).send("A tupla não existe na tabela")
    else if(err instanceof TypeError) 
      res.status(404).send(err.message)
    else if(err instanceof QueryError)
      res.status(400).send(err.message)
    else if(err instanceof UniqueConstraintError) 
      res.status(409).send(`${err.name}: ${err.errors[0].message}`)
    else if(err instanceof DatabaseError)
      res.status(400).send(err.message)
    else if(err instanceof ValidationError)
      res.status(400).send(err.message)
    else res.status(500).send(err.message)
  }

}