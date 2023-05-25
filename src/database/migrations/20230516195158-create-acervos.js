module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("acervos", {
      cod_acervo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      area_conhecimento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    }),

  down: (queryInterface) => queryInterface.dropTable("acervos"),
};
