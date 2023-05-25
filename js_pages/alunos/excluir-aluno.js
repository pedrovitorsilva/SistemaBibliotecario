/* eslint-disable no-return-assign */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
function excluir_aluno() {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const matricula = document.getElementById("matricula").value;

  cuteAlert({
    type: "question",
    title: "Deletar Aluno",
    message: `Tem certeza que deseja deletar o aluno "${nome.value}"?`,
    confirmText: "Sim",
    cancelText: "Não",
  }).then((e) => {
    if (e === "confirm") {
      fetch(`http://localhost:3000/alunos?matricula=${matricula}`, {
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
            title: "Exclusão do Aluno",
            message: `Aluno "${nome.value}" excluído com Sucesso`,
          }).then(
            () =>
              (window.location.href =
                "../../alunos/pesquisa/pesquisa-excluir-alunos.html")
          );
          if (data.error) {
            throw data;
          }
        })
        .catch((error) => console.error(error));
    }
  });
}

document.querySelector(".form-button").addEventListener("click", excluir_aluno);
