import * as Yup from "yup";
import { Op } from "sequelize";

import Aluno from "../models/Aluno";

class AlunoController {
  // Listagem dos Alunos
  async index(req, res) {
    const { cpf, nome, sobrenome, matricula, sort } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (cpf) {
      where = {
        ...where,
        cpf: {
          [Op.like]: `%${cpf}%`,
        },
      };
    }

    if (nome) {
      where = {
        ...where,
        nome: {
          [Op.like]: `%${nome}%`,
        },
      };
    }

    if (sobrenome) {
      where = {
        ...where,
        sobrenome: {
          [Op.like]: `%${sobrenome}%`,
        },
      };
    }

    if (matricula) {
      where = {
        ...where,
        matricula: {
          [Op.eq]: matricula,
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Aluno.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  // Recupera um Aluno
  async show(req, res) {
    const aluno = await Aluno.findByPk(req.params.matricula);

    if (!aluno) {
      return res.status(404).json();
    }
    return res.json(aluno);
  }

  // Cria um novo Aluno
  async create(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required("Preencher E-mail obrigatório"),
      cpf: Yup.string().required("Preencher Cpf é obrigatório"),
      telefone: Yup.string().required("Preencher Telefone é obrigatório"),
      endereco: Yup.string().required("Preencher Endereço é obrigatório"),
      nome: Yup.string().required("Preencher Nome é obrigatório"),
      sobrenome: Yup.string().required("Preencher Sobrenome é obrigatório"),
      senha: Yup.number().integer().required("Preencher Senha obrigatório"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (e) {
      const validationErrors = e.inner.map((error) => ({
        campo: error.path,
        mensagem: error.message,
      }));

      return res
        .status(400)
        .json({ error: "Erro de validação", detalhes: validationErrors });
    }
    /* if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema" });
    } */

    const newAluno = await Aluno.create(req.body);

    return res.status(201).json(newAluno);
  }

  // Atualiza um Aluno
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required("Preencher E-mail obrigatório"),
      cpf: Yup.string().required("Preencher Cpf é obrigatório"),
      telefone: Yup.string().required("Preencher Telefone é obrigatório"),
      endereco: Yup.string().required("Preencher Endereço é obrigatório"),
      nome: Yup.string().required("Preencher Nome é obrigatório"),
      sobrenome: Yup.string().required("Preencher Sobrenome é obrigatório"),
      senha: Yup.number().integer().required("Preencher Senha obrigatório"),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (e) {
      const validationErrors = e.inner.map((error) => ({
        campo: error.path,
        mensagem: error.message,
      }));

      return res
        .status(400)
        .json({ error: "Erro de validação", detalhes: validationErrors });
    }

    /* if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema" });
    } */

    const aluno = await Aluno.findByPk(req.params.matricula);

    if (!aluno) {
      return res.status(404).json();
    }

    await aluno.update(req.body);

    return res.json(aluno);
  }

  // Exclui um Aluno
  async destroy(req, res) {
    const aluno = await Aluno.findByPk(req.params.matricula);

    if (!aluno) {
      return res.status(404).json();
    }

    await aluno.destroy();

    return res.json(aluno);
  }
}

export default new AlunoController();
