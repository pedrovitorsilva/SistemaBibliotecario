/* eslint-disable no-return-assign */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
function excluir_livro(event) {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const cod_livro = document.getElementById("codigo").value;

  cuteAlert({
    type: "question",
    title: "Excluir Livro",
    message: `Tem certeza que deseja excluir o livro "${titulo.value}"?`,
    confirmText: "Sim",
    cancelText: "Não",
  }).then((e) => {
    if (e === "confirm") {
      fetch(`http://localhost:3000/livros?cod_livro=${cod_livro}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          cuteAlert({
            type: "success",
            title: "Exclusão do Livro",
            message: `Aluno "${titulo.value}" excluído com Sucesso`,
          }).then(
            () =>
              (window.location.href =
                "../../livros/pesquisa/pesquisa-excluir-livros.html")
          );
          if (data.error) {
            throw data;
          }
        })
        .catch((error) => console.error(error));
    }
  });
}

document.querySelector(".form-button").addEventListener("click", excluir_livro);
