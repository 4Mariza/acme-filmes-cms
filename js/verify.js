const foto_capa = document.getElementById("capa-dropzone-file");
const foto_fundo = document.getElementById("bg-dropzone-file");
const editar = document.getElementById("editar_filme");
const deletar = document.getElementById("deletar_filme");
const titulo = document.getElementById("title");
const preco = document.getElementById("price");
const data_lancamento = document.getElementById("data_lancamento");
const data_relancamento = document.getElementById("data_relancamento");
const id = document.getElementById("id");
const img = document.getElementById("foto");
const duracao = document.getElementById("duration");
const sinopse = document.getElementById("sinopse");
const imgBackground = document.getElementById("foto-bg");
let filme = JSON.parse(localStorage.getItem("filme"));

import { putFilme, deleteFilme } from "./filmes.js";

function exibirInformacoes(filme) {
  titulo.value = filme.nome;
  preco.value = filme.valor_unitario;
  sinopse.textContent = filme.sinopse;
  id.value = filme.id;
  img.src = filme.foto_capa;
  imgBackground.src = filme.foto_fundo;
  duracao.value = moment.utc(filme.duracao).format("HH:mm:ss");
  //moment - biblioteca JavaScript muito popular para manipulação, formatação e análise de datas e horas em JavaScript
  data_lancamento.value = moment(filme.data_lancamento)
    .format("YYYY-MM-DD")
  if (filme.data_relancamento == null) {
    data_relancamento.disabled = true;
  } else {
    data_relancamento.disabled = false;
    data_relancamento.value = moment(filme.data_relancamento).format(
      "YYYY-MM-DD"
    );
  }
}

foto_capa.addEventListener("change", () => {
  let foto;
  let file = foto_capa.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const render = e.target;
      const img = document.getElementById("foto");
      foto = render.result;
      img.src = foto;
    });
    reader.readAsDataURL(file);
  }
});

foto_fundo.addEventListener("change", () => {
  let foto;
  let file = foto_capa.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const render = e.target;
      const img = document.getElementById("foto-bg");
      foto = render.result;
      img.src = foto;
    });
    reader.readAsDataURL(file);
  }
});

exibirInformacoes(filme);

editar.addEventListener("click", async () => {
  const tituloAlterado = titulo.value;
  const precoAlterado = preco.value;
  const sinopseAlterado = sinopse.textContent;
  const imgAlterado = img.src;
  const backgroundAlterado = imgBackground.src;
  const duracaoAlterado = duracao.value;
  const lancamentoAlterado = data_lancamento.value;
  const relancamentoAlterado =
  //expressão condicional - usada para atribuir um valor a uma variável com base em uma condição.
    filme.data_relancamento === null ? null : data_relancamento.value;

  const filmeAlterado = {
    id: filme.id,
    nome: tituloAlterado,
    sinopse: sinopseAlterado,
    categoria: "Ficção Científica",
    duracao: duracaoAlterado,
    data_lancamento: lancamentoAlterado,
    data_relancamento: relancamentoAlterado,
    foto_capa: imgAlterado,
    foto_fundo: backgroundAlterado,
    valor_unitario: precoAlterado,
  };

  await putFilme(filmeAlterado);
});

deletar.addEventListener("click", async () => {
  let id = filme.id;
  let confirmacao = confirm("Tem certeza que deseja concluir essa ação?");

  if (confirmacao) {
    await deleteFilme(id);
    window.location.href = "../html/index.html";
  } else {
  }
})
