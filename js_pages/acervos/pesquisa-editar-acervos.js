/* eslint-disable no-console */
/* eslint-disable no-undef */

const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Definir campo de pesquisa
  const buscaNome = document.getElementById("busca-nome").value;
  const buscaCodigo = document.getElementById("busca-codigo").value;
  const buscaArea = document.getElementById("busca-area").value;

  const termoPesquisa = `nome=${buscaNome}&cod_acervo=${buscaCodigo}&area_conhecimento=${buscaArea}`;

  // console.log(termoPesquisa);

  fetch(`http://localhost:3000/acervos?${termoPesquisa}`)
    .then((response) => response.json())
    .then((users) => {
      console.log(users);

      if (users.length === 0) {
        cuteToast({
          type: "warning",
          message: "Não há acervos cadastrados",
        });
      }

      tableBody.innerHTML = "";
      users.forEach((acervo) => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = acervo.nome;
        row.appendChild(nameCell);

        const codeCell = document.createElement("td");
        codeCell.textContent = acervo.cod_acervo;
        row.appendChild(codeCell);

        const areaCell = document.createElement("td");
        areaCell.textContent = acervo.area_conhecimento;
        row.appendChild(areaCell);

        const editLink = document.createElement("a");
        editLink.textContent = "Editar";
        editLink.href = `../crud/editar-acervos.html?cod_acervo=${acervo.cod_acervo}`;
        const editCell = document.createElement("td");
        editCell.appendChild(editLink);
        row.appendChild(editCell);

        tableBody.appendChild(row);
      });
    });
});
