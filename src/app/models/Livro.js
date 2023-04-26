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
