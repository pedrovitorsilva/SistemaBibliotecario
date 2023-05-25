import * as Yup from "yup";
import { Op } from "sequelize";

import Acervo from "../models/Acervo";
import Livro from "../models/Livro";

class AcervoController {
  // Listagem dos Acervos
  async index(req, res) {
    const { nome, cod_acervo, area_conhecimento, sort } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (cod_acervo) {
      where = {
        ...where,
        cod_acervo: {
          [Op.eq]: cod_acervo,
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

    if (area_conhecimento) {
      where = {
        ...where,
        area_conhecimento: {
          [Op.like]: `%${area_conhecimento}%`,
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Acervo.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  // Cria um novo Acervo
  async create(req, res) {
    const schema = Yup.object().shape({
      area_conhecimento: Yup.string().required(
        "Preencher Área de Conhecimento é obrigatório"
      ),
      cod_acervo: Yup.string().required(
        "Preencher Código do Acervo é obrigatório"
      ),
      nome: Yup.string().required("Preencher Nome é obrigatório"),
    });
    let lista_erros = [];

    try {
      await schema.validate(req.body, { abortEarly: false });

      const newAcervo = await Acervo.create(req.body);
      return res.status(201).json(newAcervo);
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
        if (e.fields.PRIMARY) {
          lista_erros.push({
            campo: "cod_acervo",
            mensagem: "Código de Acervo já existente",
          });
        }
      }

      return res.status(400).json({ error: "Erro", detalhes: lista_erros });
    }
  }

  // Atualiza um Acervo
  async update(req, res) {
    const schema = Yup.object().shape({
      area_conhecimento: Yup.string().required(
        "Preencher Área de Conhecimento é obrigatório"
      ),
      cod_acervo: Yup.string().required(
        "Preencher Código do Acervo é obrigatório"
      ),
      nome: Yup.string().required("Preencher Nome é obrigatório"),
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

    const { cod_acervo } = req.query;

    const acervo = await Acervo.findByPk(cod_acervo);

    if (!acervo) {
      return res.status(404).json();
    }

    await acervo.update(req.body);

    return res.json(acervo);
  }

  // Exclui um Acervo
  async destroy(req, res) {
    const { cod_acervo } = req.query;

    const acervo = await Acervo.findByPk(cod_acervo);

    if (!acervo) {
      return res.status(404).json();
    }

    const livroCount = await Livro.count({ where: { cod_acervo } });

    if (livroCount > 0) {
      return res.status(400).json({
        campo: "Acervo possui livros",
        mensagem:
          "Não é possível excluir o acervo, pois existem livros associados a ele.",
      });
    }

    await acervo.destroy();

    return res.json(acervo);
  }
}

export default new AcervoController();
