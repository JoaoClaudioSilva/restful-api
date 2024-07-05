var express = require("express")
var router = express.Router()
const jwt = require("jsonwebtoken")

const { criaUsuario, logaUsuario, alteraUsuario } = require("../controllers/controller_usuario")
const { isLogado } = require("../helpers/helper_acesso")
const { errorHandler } = require("../helpers/helper_erro")


router.post("/register", async (req, res) => {
  const { nome, senha } = req.body

  try {
    await criaUsuario(nome, senha)
    res.status(201).send("Usuário criado com sucesso")
  } catch(err) {
    return errorHandler(res, err)
  }
})


router.post("/login", async (req, res) => {
  const { nome, senha } = req.body
  let usuario = null

  try {
    usuario = await logaUsuario(nome, senha)
  }
  catch(err){
    return errorHandler(res, err)
  }

  // Verifica se o usuário existe no banco
  if(usuario) {
    
    // Cria os valores do token
    const payload = { "nome": usuario.nome, "isAdmin": usuario.isAdmin }

    // Assina o token
    const token = jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: "30 min"})
    
    res.status(200).send("Bearer " + token)
  } else {
    res.status(401).send("Usuário não encontrado")
  } 
})


router.put("/", isLogado, async (req, res) => {
  const data = req.body
  const nome = req.user.nome

  try {
    const linhas = await alteraUsuario({ nome: nome }, data)

    if(linhas > 0) res.status(200).send("Requisição bem sucedida. Usuário alterado")
    else res.status(404).send("Usuário não encontrado")

  } catch(err) {
    return errorHandler(res, err)
  }
})

module.exports = router
