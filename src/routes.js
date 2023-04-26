import { Router } from "express";

import alunos from "./app/controllers/AlunoController";
import livros from "./app/controllers/LivroController";

const routes = new Router();

// Alunos
routes.get("/alunos", alunos.index);
// routes.get("/alunos/", alunos.show);
routes.post("/alunos", alunos.create);
routes.put("/alunos", alunos.update);
routes.delete("/alunos", alunos.destroy);

// Livros
routes.get("/livros", livros.index);
routes.post("/livros", livros.create);
routes.put("/livros", livros.update);
routes.delete("/livros", livros.destroy);

export default routes;
