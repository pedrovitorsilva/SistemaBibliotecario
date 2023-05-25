/* eslint-disable no-return-assign */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
function excluir_acervo() {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const cod_acervo = document.getElementById("cod_acervo").value;

  cuteAlert({
    type: "question",
    title: "Deletar Acervo",
    message: `Tem certeza que deseja deletar o acervo "${nome.value}"?`,
    confirmText: "Sim",
    cancelText: "Não",
  }).then((e) => {
    if (e === "confirm") {
      fetch(`http://localhost:3000/acervos?cod_acervo=${cod_acervo}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.campo === "Acervo possui livros") {
            cuteAlert({
              type: "error",
              title: "Erro ao excluir acervo",
              message: data.mensagem,
            }).then(() => {
              console.log(data);
              window.location.href =
                "../../acervos/pesquisa/pesquisa-excluir-acervos.html";
            });
          } else {
            console.log(data);
            cuteAlert({
              type: "success",
              title: "Exclusão do Acervo",
              message: `Acervo "${nome.value}" excluido com Sucesso`,
            }).then(
              () =>
                (window.location.href =
                  "../../acervos/pesquisa/pesquisa-excluir-acervos.html")
            );
          }
        })
        .catch((error) => console.error(error));
    }
  });
}

document
  .querySelector(".form-button")
  .addEventListener("click", excluir_acervo);
