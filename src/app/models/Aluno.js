import Sequelize, { Model } from "sequelize";

class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        matricula: {
          primaryKey: true,
          autoIncrement: true,
          type: Sequelize.INTEGER,
        },
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        telefone: Sequelize.STRING,
        endereco: Sequelize.STRING,
        nome: Sequelize.STRING,
        sobrenome: Sequelize.STRING,
        senha: Sequelize.INTEGER,
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

export default Aluno;
