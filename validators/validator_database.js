const Joi = require("joi")

const loja = Joi.object({
  id: Joi.number()
    .min(0)
    .required(),
  
  nme_loja: Joi.string()
    .required(),

  end_loja: Joi.string()
    .required(),
})

const produto = Joi.object({
  id: Joi.number()
    .min(0)
    .required(),

  dsc_produto: Joi.string()
    .required(),

  mrc_produto: Joi.string()
    .required()
})

const estoque = Joi.object({
  fk_produto: Joi.number()
    .min(0)
    .required(),

  fk_loja: Joi.number()
    .min(0)
    .required(),

  qnt_estoque: Joi.number()
    .required(),

  prc_estoque: Joi.number()
    .required(),
})

const schemas = { loja, produto, estoque }

module.exports = {
  /**
   * Valida os dados utilizando o joi
   * @param {string} schema Nome do schema
   * @param {JSON} data     Valores da tupla
   * 
   * @returns {Joi.ValidationResult} Resultado de validação pelo joi 
   */
  validaDados: (schema, data) => {
    return schemas[schema].validate(data)
  }
}
