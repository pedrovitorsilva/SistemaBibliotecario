/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const acervoFields = {
  nome: document.getElementById("nome"),
  area_conhecimento: document.getElementById("area_conhecimento"),
  cod_acervo: document.getElementById("cod_acervo"),
};

function editar_acervo(event) {
  event.preventDefault(); // previne o envio do formulário pelo navegador

  const acervoAtual = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, field] of Object.entries(acervoFields)) {
    field.setCustomValidity("");
    acervoAtual[key] = field.value;
  }

  fetch(`http://localhost:3000/acervos?cod_acervo=${cod_acervo}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(acervoAtual),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      if (!data.error) {
        cuteAlert({
          type: "success",
          title: "Edição do Acervo",
          message: `Acervo "${nome.value}" editado com Sucesso`,
        }).then(
          () =>
            (window.location.href =
              "../../acervos/pesquisa/pesquisa-editar-acervos.html")
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

document.querySelector(".form-button").addEventListener("click", editar_acervo);
