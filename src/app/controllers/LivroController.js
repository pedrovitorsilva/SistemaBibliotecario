import * as Yup from "yup";
import { Op } from "sequelize";

import Livro from "../models/Livro";

class LivroController {
  // Listagem dos Livros
  async index(req, res) {
    const { codLivro, titulo, autor, sort } = req.query;

    const page = req.query.page || 1;
    const limit = req.query.limit || 25;

    let where = {};
    let order = [];

    if (codLivro) {
      where = {
        ...where,
        codLivro: {
          [Op.like]: `%${codLivro}%`,
        },
      };
    }

    if (titulo) {
      where = {
        ...where,
        titulo: {
          [Op.like]: `%${titulo}%`,
        },
      };
    }

    if (autor) {
      where = {
        ...where,
        autor: {
          [Op.like]: `%${autor}%`,
        },
      };
    }

    if (sort) {
      order = sort.split(",").map((item) => item.split(":"));
    }

    const data = await Livro.findAll({
      where,
      order,
      limit,
      offset: limit * page - limit,
    });

    return res.json(data);
  }

  // Cria um novo Livro
  async create(req, res) {
    const schema = Yup.object().shape({
      autor: Yup.string().required("Preencher Autor é obrigatório"),
      resumo: Yup.string().required("Preencher Resumo é obrigatório"),
      titulo: Yup.string().required("Preencher Título é obrigatório"),
      data_publicacao: Yup.date().required(
        "Preencher Data de Publicação é obrigatório"
      ),
      palavras_chave: Yup.string().required(
        "Preencher Palavras Chave é obrigatório"
      ),
      versao: Yup.string().required("Preencher Versão é obrigatório"),
    });

    let lista_erros = [];

    try {
      await schema.validate(req.body, { abortEarly: false });

      const newLivro = await Livro.create(req.body);
      return res.status(201).json(newLivro);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
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
            campo: "cod_livro",
            mensagem: "Código do livro já existente",
          });
        }
      }

      return res.status(400).json({ error: "Erro", detalhes: lista_erros });
    }
  }

  // Atualiza um Livro
  async update(req, res) {
    const schema = Yup.object().shape({
      autor: Yup.string().required("Preencher Autor é obrigatório"),
      resumo: Yup.string().required("Preencher Resumo é obrigatório"),
      titulo: Yup.string().required("Preencher Título é obrigatório"),
      data_publicacao: Yup.date().required(
        "Preencher Data de Publicação é obrigatório"
      ),
      palavras_chave: Yup.string().required(
        "Preencher Palavras Chave é obrigatório"
      ),
      versao: Yup.string().required("Preencher Versão é obrigatório"),
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

    const { cod_livro } = req.query;

    const livro = await Livro.findByPk(cod_livro);

    if (!livro) {
      return res.status(404).json();
    }

    await livro.update(req.body);

    return res.json(livro);
  }

  // Exclui um Livro
  async destroy(req, res) {
    const { cod_livro } = req.query;

    const livro = await Livro.findByPk(cod_livro);

    if (!livro) {
      return res.status(404).json();
    }

    await livro.destroy();

    return res.json(livro);
  }
}

export default new LivroController();
