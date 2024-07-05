const jwt = require("jsonwebtoken")

/**
 * Testa se o token é válido
 * @param {string} authHeader Cabeçalho de autorização da requisição
 * 
 * @returns {JSON}            Objeto do resultado da autenticação
 */
function autenticaJWT(authHeader) {
  if (!authHeader) {
    return { msg: "O token não foi fornecido", user: null }
  }

  const token = authHeader.split(" ")[1]  // Exclui o prefixo e mantém o token

  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT)
    return { msg: "Usuário encontrado", user: decoded }
  } 
  catch(err) {
    return { msg: "O token enviado é inválido", user: null }
  }
}


module.exports = {

  /**
   * Testa se o usuário logado é admin
   * @param {Express.Request} req       Objeto da requisição
   * @param {Express.Response} res      Objeto da resposta
   * @param {Express.NextFunction} next Próxima função da pilha
   * 
   * @returns {Express.Response | void} Objeto de resposta ou próxima função
   */
  isAdmin: (req, res, next) => {
    const authHeader = req.headers.authorization

    const answer = autenticaJWT(authHeader)

    if(!answer.user){
      return res.status(401).send(answer.msg)
    }

    if(answer.user.isAdmin){
      next()
    } else {
      return res.status(403).send("O usuário deve ser administrador para acessar esse recurso")
    }
  },

  /**
   * Testa se o usuário está logado
   * @param {Express.Request} req       Objeto da requisição
   * @param {Express.Response} res      Objeto da resposta
   * @param {Express.NextFunction} next Próxima função da pilha
   * 
   * @returns {Express.Response | void} Objeto de resposta ou próxima função
   */
  isLogado: (req, res, next) => {
    const authHeader = req.headers.authorization

    const answer = autenticaJWT(authHeader)

    if(answer.user){
      req.user = answer.user
      next()
    } else {
      return res.status(401).send("Usuário não está logado")
    }
  }
}