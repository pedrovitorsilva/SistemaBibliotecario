import { Router } from "express";

import alunos from "./app/controllers/AlunoController";
import livros from "./app/controllers/LivroController";
import acervos from "./app/controllers/AcervoController";

const routes = new Router();

// Alunos
routes.get("/alunos", alunos.index);
routes.post("/alunos", alunos.create);
routes.put("/alunos", alunos.update);
routes.delete("/alunos", alunos.destroy);

// Livros
routes.get("/livros", livros.index);
routes.post("/livros", livros.create);
routes.put("/livros", livros.update);
routes.delete("/livros", livros.destroy);

// Acervos
routes.get("/acervos", acervos.index);
routes.post("/acervos", acervos.create);
routes.put("/acervos", acervos.update);
routes.delete("/acervos", acervos.destroy);

export default routes;
