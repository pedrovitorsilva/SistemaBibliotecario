import Sequelize, { Model } from "sequelize";

class Acervo extends Model {
  static init(sequelize) {
    super.init(
      {
        cod_acervo: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        area_conhecimento: Sequelize.STRING,
        nome: Sequelize.STRING,
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

export default Acervo;
