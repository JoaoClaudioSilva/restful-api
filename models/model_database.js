const { Sequelize, DataTypes, Op } = require("sequelize");
const { errorHandler } = require("../helpers/helper_erro");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectModule: require("pg"),
});

/**
 * Instala o banco de dados padrão
 * @param {Express.Response} res Objeto de resposta
 *
 * @returns {Express.Response} Objeto de resposta
 */
const install = async (res) => {
  const data = require("./install_data.json");

  try {
    await sequelize.sync({ force: true });

    for (const Loja of data.Lojas) {
      await loja.create(Loja);
    }

    for (const Produto of data.Produtos) {
      await produto.create(Produto);
    }

    for (const Estoque of data.Estoques) {
      await estoque.create(Estoque);
    }

    return res.status(201).send("Banco de dados instalado com sucesso");
  } catch (err) {
    errorHandler(res, err);
  }
};

const allTables = async () => {
  return (await sequelize.getQueryInterface().showAllTables()).filter(
    (table) => table !== "Usuarios" && table !== "Estoques"
  );
};

// Modelo da tabela de lojas
const loja = sequelize.define("Loja", {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  nme_loja: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  end_loja: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Modelo da tabela de produtos
const produto = sequelize.define("Produto", {
  id: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  dsc_produto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mrc_produto: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Modelo da tabela de estoques
const estoque = sequelize.define("Estoque", {
  fk_produto: {
    type: DataTypes.TEXT,
    primaryKey: true,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  fk_loja: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  qnt_estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  prc_estoque: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// Relação M-lojas para N-produtos
loja.belongsToMany(produto, {
  through: estoque,
  foreignKey: "fk_loja",
  otherKey: "fk_produto",
});

// Relação M-produtos para N-lojas
produto.belongsToMany(loja, {
  through: estoque,
  foreignKey: "fk_produto",
  otherKey: "fk_loja",
});

module.exports = { loja, produto, estoque, install, allTables, Op };
