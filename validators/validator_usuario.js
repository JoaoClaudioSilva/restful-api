const Joi = require("joi")

const usuarioSchema = Joi.object({
  nome: Joi.string().min(8).required(),
  senha: Joi.string().min(8).required(),
  isAdmin: Joi.boolean().required().default(false)
})

module.exports = {
  /**
   * Valida o usuário utilizando o joi
   * @param {JSON} usuario  Campos do usuário
   * 
   * @returns {Joi.ValidationResult} Resultado de validação pelo joi 
   */
  validaUsuario: (usuario) => {
    return usuarioSchema.validate({...usuario, isAdmin: false})
  }
}


