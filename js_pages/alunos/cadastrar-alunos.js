/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
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

function cadastrar_aluno(event) {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const novoAluno = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, field] of Object.entries(alunoFields)) {
    novoAluno[key] = field.value;
  }

  fetch("http://localhost:3000/alunos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoAluno),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (!data.error) {
        cuteAlert({
          type: "success",
          title: "Cadastro do Aluno",
          message: `Aluno "${nome.value}" cadastrado com Sucesso`,
        }).then(
          () => (window.location.href = "../../alunos/crud/pagina-alunos.html")
        );
      } else throw data;
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

document
  .querySelector(".form-button")
  .addEventListener("click", cadastrar_aluno);
