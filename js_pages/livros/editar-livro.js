/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */

const livroFields = {
  titulo: document.getElementById("titulo"),
  autor: document.getElementById("autor"),
  data_publicacao: document.getElementById("data"),
  cod_livro: document.getElementById("codigo"),
  versao: document.getElementById("versao"),
  palavras_chave: document.getElementById("chaves"),
  resumo: document.getElementById("resumo"),
  cod_acervo: document.getElementById("cod_acervo"),
};

function editar_livro(event) {
  event.preventDefault();

  const livroAtual = {};

  for (const [key, field] of Object.entries(livroFields)) {
    livroAtual[key] = field.value;
  }

  const cod_livro = document.getElementById("codigo").value;

  fetch(`http://localhost:3000/livros?cod_livro=${cod_livro}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livroAtual),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (!data.error) {
        cuteAlert({
          type: "success",
          title: "Edição do Livro",
          message: `Livro "${titulo.value}" editado com Sucesso`,
        }).then(
          () => (window.location.href = "../../livros/crud/pagina-livros.html")
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

document.querySelector(".form-button").addEventListener("click", editar_livro);
