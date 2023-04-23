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
      email: Yup.string()
        .email("E-mail inválido")
        .required("Obrigatório preencher e-mail"),
      cpf: Yup.string()
        .matches(
          /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          "CPF deve estar no formato xxx.xxx.xxx-xx"
        )
        .required("Preencher Cpf é obrigatório"),
      telefone: Yup.string().required("Preencher Telefone é obrigatório"),
      endereco: Yup.string().required("Preencher Endereço é obrigatório"),
      nome: Yup.string().required("Preencher Nome é obrigatório"),
      sobrenome: Yup.string().required("Preencher Sobrenome é obrigatório"),
      senha: Yup.number().integer().required("Preencher Senha obrigatório"),
    });

    let lista_erros = [];

    try {
      await schema.validate(req.body, { abortEarly: false });

      const newAluno = await Aluno.create(req.body);
      return res.status(201).json(newAluno);
    } catch (e) {
      // Erros de campos não preenchidos

      if (e.name === "ValidationError") {
        const erros_validacao = e.inner.map((error) => ({
          campo: error.path,
          mensagem: error.message,
        }));
        lista_erros = [...lista_erros, ...erros_validacao];
      }

      // Erros de campos já existentes

      if (e.name === "SequelizeUniqueConstraintError") {
        if (e.fields.cpf) {
          lista_erros.push({ campo: "cpf", mensagem: "CPF já existente" });
        }

        if (e.fields.PRIMARY) {
          lista_erros.push({
            campo: "matricula",
            mensagem: "Matrícula já existente",
          });
        }
      }

      return res.status(400).json({ error: "Erro", detalhes: lista_erros });
    }
  }

  // Atualiza um Aluno
  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email("E-mail inválido")
        .required("Obrigatório preencher e-mail"),
      cpf: Yup.string()
        .matches(
          /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          "CPF deve estar no formato xxx.xxx.xxx-xx"
        )
        .required("Preencher Cpf é obrigatório")
        .test("unique-cpf", "CPF já existente", async (value) => {
          const aluno = await Aluno.findOne({
            where: { cpf: value, matricula: { [Op.ne]: req.params.matricula } },
          });
          return !aluno;
        }),
      telefone: Yup.string().required("Preencher Telefone é obrigatório"),
      endereco: Yup.string().required("Preencher Endereço é obrigatório"),
      nome: Yup.string().required("Preencher Nome é obrigatório"),
      sobrenome: Yup.string().required("Preencher Sobrenome é obrigatório"),
      senha: Yup.number().integer().required("Preencher Senha obrigatório"),
    });

    let lista_erros = [];

    // Validar schema
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (e) {
      // Erros de campos não preenchidos

      if (e.name === "ValidationError") {
        const erros_validacao = e.inner.map((error) => ({
          campo: error.path,
          mensagem: error.message,
        }));
        lista_erros = [...lista_erros, ...erros_validacao];
      }
      return res
        .status(400)
        .json({ error: "Erro de validação", detalhes: lista_erros });
    }

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
