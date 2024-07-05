const express = require("express")
const router = express.Router()

const { isAdmin } = require("../helpers/helper_acesso")
const { excluiUsuario, alteraUsuario } = require("../controllers/controller_usuario")
const { errorHandler } = require("../helpers/helper_erro")


router.delete("/:nome", isAdmin, async (req, res) => {
  const nome = req.params.nome

  try {
    const linhas = await excluiUsuario(nome)

    if(linhas > 0) res.status(200).send("Requisição bem sucedida. Usuário excluído")
    else res.status(404).send("Usuário não foi encontrado")

  } catch(err) {
    return errorHandler(res, err)
  }
})


router.put("/update/:nome", isAdmin, async (req, res) => {
  const data = req.body
  const nome = req.params.nome

  try {
    const linhas = await alteraUsuario({ nome: nome, isAdmin: false }, data)

    if(linhas > 0) res.status(200).send("Requisição bem sucedida. Usuário alterado por admin")
    else res.status(404).send("Usuário não foi encontrado")
  
  } catch(err){
    return errorHandler(res, err)
  }
})


router.put("/create/:nome", isAdmin, async (req, res) => {
  const nome = req.params.nome

  try {
    const linhas = await alteraUsuario({ nome: nome, isAdmin: false }, { isAdmin: true })
    
    if(linhas > 0) res.status(200).send("Requisição bem sucedida. Usuário agora é administrador")
    else res.status(404).send("Usuário não encontrado ou já administrador")
  
  } catch(err) {
    return errorHandler(res, err)
  }
})


module.exports = router
