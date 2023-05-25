/* eslint-disable no-return-assign */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const livroFields = {
  titulo: document.getElementById("titulo"),
  autor: document.getElementById("autor"),
  data_publicacao: document.getElementById("data_publicacao"),
  cod_livro: document.getElementById("cod_livro"),
  versao: document.getElementById("versao"),
  palavras_chave: document.getElementById("palavras_chave"),
  resumo: document.getElementById("resumo"),
  cod_acervo: document.getElementById("lista_acervos"),
};

function cadastrar_livro(event) {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const novoLivro = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, field] of Object.entries(livroFields)) {
    novoLivro[key] = field.value;
  }

  fetch("http://localhost:3000/livros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoLivro),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (!data.error) {
        cuteAlert({
          type: "success",
          title: "Cadastro do Livro",
          message: `Livro "${titulo.value}" cadastrado com Sucesso`,
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

document
  .querySelector(".form-button")
  .addEventListener("click", cadastrar_livro);
