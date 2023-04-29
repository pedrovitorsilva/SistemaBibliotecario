/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
function editar_livro() {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const livroAtual = {
    titulo: document.getElementById("titulo").value,
    autor: document.getElementById("autor").value,
    data_publicacao: document.getElementById("data").value,
    cod_livro: document.getElementById("codigo").value,
    versao: document.getElementById("versao").value,
    palavras_chave: document.getElementById("chaves").value,
    resumo: document.getElementById("resumo").value,
  };

  fetch(`http://localhost:3000/livros?cod_livro=${cod_livro}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(livroAtual),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

document.querySelector(".form-button").addEventListener("click", editar_livro);
