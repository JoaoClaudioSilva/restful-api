const { Sequelize, DataTypes } = require("sequelize")


const sequelize = new Sequelize("postgres://" +
  "default:" +
  process.env.SECRET_PGS +
  "@ep-wispy-boat-a4em6u28.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require", {dialectModule: require("pg")});


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
    }
  },
)


module.exports = Usuario
