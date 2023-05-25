/* eslint-disable no-console */
/* eslint-disable no-undef */

const form = document.querySelector("form");
const tableBody = document.querySelector("tbody");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Definir campo de pesquisa
  const buscaTitulo = document.getElementById("busca-titulo").value;
  const buscaAutor = document.getElementById("busca-autor").value;
  const buscaCodigo = document.getElementById("busca-codigo").value;

  const termoPesquisa = `titulo=${buscaTitulo}&autor=${buscaAutor}&cod_livro=${buscaCodigo}`;
  // console.log(termoPesquisa);

  fetch(`http://localhost:3000/livros?${termoPesquisa}`)
    .then((response) => response.json())
    .then((users) => {
      console.log(users);

      if (users.length === 0) {
        cuteToast({
          type: "warning",
          message: "Não há livros cadastrados",
        });
      }

      tableBody.innerHTML = "";
      users.forEach((livro) => {
        console.log(livro);
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        titleCell.textContent = livro.titulo;
        row.appendChild(titleCell);

        const actorCell = document.createElement("td");
        actorCell.textContent = livro.autor;
        row.appendChild(actorCell);

        const codeCell = document.createElement("td");
        codeCell.textContent = livro.cod_livro;
        row.appendChild(codeCell);

        const searchLink = document.createElement("a");
        searchLink.textContent = "Pesquisar";
        searchLink.href = `../crud/pesquisar-livros.html?cod_livro=${livro.cod_livro}`;
        const searchCell = document.createElement("td");
        searchCell.appendChild(searchLink);
        row.appendChild(searchCell);

        tableBody.appendChild(row);
      });
    });
});
