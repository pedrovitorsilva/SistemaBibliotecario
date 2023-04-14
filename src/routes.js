import { Router } from "express";

import alunos from "./app/controllers/AlunoController";

const routes = new Router();

// Customers
routes.get("/alunos", alunos.index);
routes.get("/alunos/:matricula", alunos.show);
routes.post("/alunos", alunos.create);
routes.put("/alunos/:matricula", alunos.update);
routes.delete("/alunos/:matricula", alunos.destroy);

export default routes;
