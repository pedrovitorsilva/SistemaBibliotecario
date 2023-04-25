import { Router } from "express";

import alunos from "./app/controllers/AlunoController";

const routes = new Router();

// Customers
routes.get("/alunos", alunos.index);
// routes.get("/alunos/", alunos.show);
routes.post("/alunos", alunos.create);
routes.put("/alunos/", alunos.update);
routes.delete("/alunos/", alunos.destroy);

export default routes;
