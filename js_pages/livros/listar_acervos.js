/* eslint-disable no-return-assign */
/* Arquivo js para listar os acervos existentes,
   no momento de cadastro e edição dos livros. */

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const lista_acervos = document.getElementById("lista_acervos");

fetch(`http://localhost:3000/acervos?cod_acervo= `)
  .then((response) => response.json())
  .then((acervos) => {
    // Ignorar caso não haja acervos
    if (acervos.length === 0) {
      cuteAlert({
        type: "warning",
        title: "Acervos Inexistentes",
        message:
          "Não há acervos cadastrados!\nSó é possível cadastrar livros caso existam acervos.",
      }).then(
        () => (window.location.href = "../../livros/crud/pagina-livros.html")
      );
    } else {
      for (const a of acervos) {
        console.log(a);

        const opcao = document.createElement("option");
        opcao.innerHTML = `${a.nome} (Código: ${a.cod_acervo})`;
        opcao.value = a.cod_acervo;

        lista_acervos.appendChild(opcao);
      }
    }
  });
