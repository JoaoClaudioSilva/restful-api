const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databases/usuario.sqlite",
  logging: false
})


// Cria a tabela caso não exista
sequelize.sync()
  .then(() => {
    Usuario.findOrCreate({ 
      where: { 
        nome: process.env.ADMIN_USER,
        senha: process.env.ADMIN_PSWD,
        isAdmin: true,
      },
    })
    console.log("Banco de dados e tabelas de usuários sincronizados")
  })
  .catch(err => {
    console.error("Erro ao sincronizar banco de dados de usuários: ", err)
  })


// Modelo da tabela de usuários
const Usuario = sequelize.define(
  "Usuario",
  {
    nome: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: 8,
      }
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 8,
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    /*
     * Adição do contador de logins de usuários
     */
    counter: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  },
)


module.exports = Usuario
