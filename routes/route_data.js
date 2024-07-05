const express = require("express")
const router = express.Router()

const helper_acesso = require("../helpers/helper_acesso")
const { errorHandler } = require("../helpers/helper_erro")
const { criaTupla, leTupla, atualizaTupla, excluiTupla, leTabela } = require("../controllers/controller_database")
const { QueryError } = require("sequelize")


router.post("/:modelo", helper_acesso.isLogado, async (req, res) => {
  const modelo = req.params.modelo
  const data = req.body

  try {
    const tupla = await criaTupla(modelo, data)
    res.status(201).send(tupla) 
  } catch(err) {
    return errorHandler(res, err)
  }
})


router.get("/:modelo", async (req, res) => {
  const { modelo } = req.params

  try {
    const tabela = await leTabela(modelo)
    res.status(200).send(tabela)
  }
  catch(err) {
    err.message = "O modelo solicitado não existe no banco de dados"
    return errorHandler(res, err)
  }
})


router.get("/:modelo/search", async (req, res) => {
  const { modelo } = req.params
  let { ordem, limite, pagina, ...query } = req.query

  // Formata os parâmetros para busca, trocando - por um espaço
  for(const key in query) {
    query[key] = query[key].replace(/-/g, " ")
  }

  // Separa o nome da coluna da opção de ordenação 
  ordem ? ordem = [ordem.split(",")] : ordem = null

  try {
    if(!(limite || pagina)) throw new QueryError("Campos 'limite' e 'pagina' são obrigatórios")
    const resposta = await leTupla(modelo, query, ordem, limite, pagina)
    res.status(200).send(resposta)
  }
  catch(err) {
    return errorHandler(res, err)
  }
})


router.get("/:modelo/:id", async (req, res) => {
  const { modelo, id } = req.params

  try {
    const tupla = await leTupla(modelo, { id: id })
    res.status(200).send(tupla)
  } catch(err) {
    return errorHandler(res, err)
  }
})


router.put("/:modelo/:id", helper_acesso.isAdmin, async (req, res) => {
  const { modelo, id } = req.params
  const data = req.body

  try {
    const linhas = await atualizaTupla(modelo, id, data)

    if(linhas > 0) res.status(200).send("Requisição bem sucedida. Tupla atualizada")
    else res.status(404).send("A tupla não foi encontrada")

  } catch(err) {
    return errorHandler(res, err)
  }
})


router.delete("/:modelo/:id", helper_acesso.isAdmin, async (req, res) => {
  const { modelo, id } = req.params

  try {
    const linhas = await excluiTupla(modelo, id)

    if(linhas > 0) res.status(200).send("Requisição bem sucedida. Tupla excluída")
    else res.status(404).send("A tupla não foi encontrada")

  } catch (err) {
    return errorHandler(res, err)
  }
})


module.exports = router
