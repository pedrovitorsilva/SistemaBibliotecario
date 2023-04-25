/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const urlParams = new URLSearchParams(window.location.search);
const matricula = urlParams.get("matricula");

fetch(`http://localhost:3000/alunos?matricula=${matricula}`)
  .then((response) => response.json())
  .then((alunoAtual) => {
    alunoAtual = { ...alunoAtual[0] };

    console.log(alunoAtual);

    const nomeElement = document.querySelector("#nome");
    nomeElement.value = alunoAtual.nome;

    const sobrenomeElement = document.querySelector("#sobrenome");
    sobrenomeElement.value = alunoAtual.sobrenome;

    const cpfElement = document.querySelector("#cpf");
    cpfElement.value = alunoAtual.cpf;

    const matriculaElement = document.querySelector("#matricula");
    matriculaElement.value = alunoAtual.matricula;

    const enderecoElement = document.querySelector("#endereco");
    enderecoElement.value = alunoAtual.endereco;

    const emailElement = document.querySelector("#email");
    emailElement.value = alunoAtual.email;

    const telefoneElement = document.querySelector("#telefone");
    telefoneElement.value = alunoAtual.telefone;

    const senhaElement = document.querySelector("#senha");
    senhaElement.value = alunoAtual.senha;
  });
