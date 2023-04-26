/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
function editar_aluno() {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const alunoAtual = {
    nome: document.getElementById("nome").value,
    sobrenome: document.getElementById("sobrenome").value,
    matricula: document.getElementById("matricula").value,
    cpf: document.getElementById("cpf").value,
    endereco: document.getElementById("endereco").value,
    email: document.getElementById("email").value,
    telefone: document.getElementById("telefone").value,
    senha: document.getElementById("senha").value,
  };

  fetch(`http://localhost:3000/alunos?matricula=${matricula}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alunoAtual),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

document.querySelector(".form-button").addEventListener("click", editar_aluno);
