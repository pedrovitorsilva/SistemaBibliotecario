/* eslint-disable no-console */
/* eslint-disable no-undef */

const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Definir campo de pesquisa
  const campoDePesquisa = document.querySelector("#busca").value;

  let tipoCampo;

  function campoCPF(cpf) {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  }

  function campoNumero(numero) {
    return /^\d+$/.test(numero);
  }

  if (campoCPF(campoDePesquisa)) {
    tipoCampo = "cpf";
  } else if (campoNumero(campoDePesquisa)) {
    tipoCampo = "matricula";
  } else {
    tipoCampo = "nome";
  }

  const termoPesquisa = `${tipoCampo}=${campoDePesquisa}`;

  fetch(`http://localhost:3000/alunos?${termoPesquisa}`)
    .then((response) => response.json())
    .then((users) => {
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
        editLink.href = `../html/editar-alunos.html?matricula=${user.matricula}`;
        const editCell = document.createElement("td");
        editCell.appendChild(editLink);
        row.appendChild(editCell);

        const searchLink = document.createElement("a");
        searchLink.textContent = "Ver(Pesquisar)";
        searchLink.href = `../html/pesquisar-alunos.html?matricula=${user.matricula}`;
        const searchCell = document.createElement("td");
        searchCell.appendChild(searchLink);
        row.appendChild(searchCell);

        const deleteLink = document.createElement("a");
        deleteLink.textContent = "Deletar";
        deleteLink.href = `../html/deletar-alunos.html?matricula=${user.matricula}`;
        const deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteLink);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
      });
    });
});
