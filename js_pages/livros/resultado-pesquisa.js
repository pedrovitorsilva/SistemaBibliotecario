/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const urlParams = new URLSearchParams(window.location.search);
const codLivro = urlParams.get("codLivro");

fetch(`http://localhost:3000/livros?cod_livro=${codLivro}`)
  .then((response) => response.json())
  .then((livroAtual) => {
    livroAtual = { ...livroAtual[0] };

    console.log(livroAtual);

    const titleElement = document.querySelector("#titulo");
    titleElement.value = livroAtual.titulo;

    const actorElement = document.querySelector("#autor");
    actorElement.value = livroAtual.autor;

    const dateElement = document.querySelector("#data");
    dateElement.value = livroAtual.data_publicacao;

    const codeElement = document.querySelector("#codigo");
    codeElement.value = livroAtual.cod_livro;

    const versionElement = document.querySelector("#versao");
    versionElement.value = livroAtual.versao;

    const acervoElement = document.querySelector("#cod_acervo");
    acervoElement.value = livroAtual.cod_acervo;

    const keywordsElement = document.querySelector("#chaves");
    keywordsElement.value = livroAtual.palavras_chave;

    const resumeElement = document.querySelector("#resumo");
    resumeElement.value = livroAtual.resumo;
  });
