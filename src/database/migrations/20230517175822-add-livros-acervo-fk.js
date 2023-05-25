module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn("livros", "cod_acervo", {
      type: Sequelize.INTEGER,
      allowNull: false,
      // onDelete: "CASCADE",
      references: {
        model: "acervos",
        key: "cod_acervo",
      },
    }),

  down: (queryInterface) => queryInterface.removeColumn("livros", "cod_acervo"),
};
