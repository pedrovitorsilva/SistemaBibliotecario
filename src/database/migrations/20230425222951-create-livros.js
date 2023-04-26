module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("livros", {
      cod_livro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      resumo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_publicacao: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      palavras_chave: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      versao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("livros"),
};
