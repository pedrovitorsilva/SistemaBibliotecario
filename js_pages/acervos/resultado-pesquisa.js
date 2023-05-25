/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const urlParams = new URLSearchParams(window.location.search);
const cod_acervo = urlParams.get("cod_acervo");

fetch(`http://localhost:3000/acervos?cod_acervo=${cod_acervo}`)
  .then((response) => response.json())
  .then((acervoAtual) => {
    acervoAtual = { ...acervoAtual[0] };

    console.log(acervoAtual);

    const nameElement = document.querySelector("#nome");
    nameElement.value = acervoAtual.nome;

    const codeElement = document.querySelector("#cod_acervo");
    codeElement.value = acervoAtual.cod_acervo;

    const areaElement = document.querySelector("#area_conhecimento");
    areaElement.value = acervoAtual.area_conhecimento;
  });
