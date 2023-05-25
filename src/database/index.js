import Sequelize from "sequelize";

import config from "../config/database";

import Aluno from "../app/models/Aluno";
import Livro from "../app/models/Livro";
import Acervo from "../app/models/Acervo";

const models = [Aluno, Livro, Acervo];

class Database {
  constructor() {
    this.connection = new Sequelize(config);
    this.init();
    this.associate();
  }

  init() {
    models.forEach((model) => model.init(this.connection));
  }

  associate() {
    models.forEach((model) => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
