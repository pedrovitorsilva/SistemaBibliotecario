import Sequelize, { Model } from "sequelize";

class Livro extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_livro: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        autor: Sequelize.STRING,
        resumo: Sequelize.STRING,
        titulo: Sequelize.STRING,
        data_publicacao: Sequelize.DATEONLY,
        palavras_chave: Sequelize.STRING,
        versao: Sequelize.STRING,
        cod_acervo: {
          type: Sequelize.INTEGER,
          references: {
            model: "acervos",
            key: "cod_acervo",
          },
        },
      },
      {
        sequelize,
      },
      {
        timestamps: false,
      }
    );
  }
}

export default Livro;
