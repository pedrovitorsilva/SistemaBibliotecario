/* eslint-disable no-console */
/* eslint-disable no-undef */

const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Definir campo de pesquisa
  const buscaNome = document.getElementById("busca-nome").value;
  const buscaCpf = document.getElementById("busca-cpf").value;
  const buscaMatricula = document.getElementById("busca-matricula").value;

  const termoPesquisa = `nome=${buscaNome}&cpf=${buscaCpf}&matricula=${buscaMatricula}`;

  console.log(termoPesquisa);

  fetch(`http://localhost:3000/alunos?${termoPesquisa}`)
    .then((response) => response.json())
    .then((users) => {
      console.log(users);

      if (users.length === 0) {
        cuteToast({
          type: "warning",
          message: "Não há alunos cadastrados",
        });
      }

      tableBody.innerHTML = "";
      users.forEach((user) => {
        const row = document.createElement("tr");

        const fullNameCell = document.createElement("td");
        fullNameCell.textContent = `${user.nome} ${user.sobrenome}`;
        row.appendChild(fullNameCell);

        const matriculaCell = document.createElement("td");
        matriculaCell.textContent = user.matricula;
        row.appendChild(matriculaCell);

        const cpfCell = document.createElement("td");
        cpfCell.textContent = user.cpf;
        row.appendChild(cpfCell);

        const editLink = document.createElement("a");
        editLink.textContent = "Editar";
        editLink.href = `../crud/editar-alunos.html?matricula=${user.matricula}`;
        const editCell = document.createElement("td");
        editCell.appendChild(editLink);
        row.appendChild(editCell);

        tableBody.appendChild(row);
      });
    });
});
