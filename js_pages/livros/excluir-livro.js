/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
function excluir_livro(event) {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const cod_livro = document.getElementById("codigo").value;

  fetch(`http://localhost:3000/livros?cod_livro=${cod_livro}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

document.querySelector(".form-button").addEventListener("click", excluir_livro);
