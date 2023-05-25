/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const alunoFields = {
  nome: document.getElementById("nome"),
  sobrenome: document.getElementById("sobrenome"),
  matricula: document.getElementById("matricula"),
  cpf: document.getElementById("cpf"),
  endereco: document.getElementById("endereco"),
  email: document.getElementById("email"),
  telefone: document.getElementById("telefone"),
  senha: document.getElementById("senha"),
};

function editar_aluno(event) {
  event.preventDefault();

  const alunoAtual = {};

  for (const [key, field] of Object.entries(alunoFields)) {
    alunoAtual[key] = field.value;
  }

  fetch(`http://localhost:3000/alunos?matricula=${alunoAtual.matricula}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alunoAtual),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (!data.error) {
        cuteAlert({
          type: "success",
          title: "Edição do Aluno",
          message: `Aluno "${nome.value}" editado com Sucesso`,
        }).then(
          () => (window.location.href = "../../alunos/crud/pagina-alunos.html")
        );
      } else {
        throw data;
      }
    })
    .catch((error) => {
      console.error(error);
      if (error.detalhes && error.detalhes.length > 0) {
        error.detalhes.slice(0, 7).forEach(({ mensagem }) => {
          cuteToast({
            type: "error",
            message: mensagem,
          });
        });
      }
    });
}

document.querySelector(".form-button").addEventListener("click", editar_aluno);
