import { putFilme, getFilme } from "../../filmes.js";
import { uploadImgur } from "../../imgur.js";
import {getClassificacoes} from "../../classificacoes.js"

const foto_capa = document.getElementById("capa-dropzone-file");
const foto_fundo = document.getElementById("bg-dropzone-file");
const editar = document.getElementById("editar_filme");
const titulo = document.getElementById("title");
const preco = document.getElementById("price");
const data_lancamento = document.getElementById("data_lancamento");
const data_relancamento = document.getElementById("data_relancamento");
const duracao = document.getElementById("duration");
const sinopse = document.getElementById("sinopse");
const destaque = document.getElementById("destaque");
const classificacao = document.getElementById("classificacao")

let id = JSON.parse(localStorage.getItem("filme"));

editar.addEventListener("click", async () => {
  let filme = await getFilme(id);
  let urlImg = filme.foto_capa;
  let urlImgBackground = filme.foto_fundo;

  if (foto_capa.files.length > 0) {
    urlImg = await uploadImgur(foto_capa.files[0]);
  }

  if (foto_fundo.files.length > 0) {
    urlImgBackground = await uploadImgur(foto_fundo.files[0]);
  }

  let foto;
  foto_capa.addEventListener("change", () => {
    let fileImg;
    fileImg = foto_capa.files[0];

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
    let fileImgBackground;

    fileImgBackground = foto_fundo.files[0];

    let foto;
    let file = foto_fundo.files[0];

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

  const tituloAlterado = titulo.value;
  const precoAlterado = preco.value;
  const sinopseAlterado = sinopse.value;
  const imgAlterado = urlImg;
  const backgroundAlterado = urlImgBackground;
  const duracaoAlterado = duracao.value;
  const lancamentoAlterado = moment(data_lancamento.value).format("YYYY-MM-DD");
  const destaqueAlterado = destaque.checked;
  const generos = JSON.parse(localStorage.getItem('generos'))
  let classificacaoAlterada = 1

  let classificacoes = await getClassificacoes()
  for (let i = 0; i < classificacoes.length; i++){
    let classificacaoDB = classificacoes[i]
    if(classificacaoDB.faixa_etaria == classificacao.value){
       classificacaoAlterada = classificacaoDB.id
    }
  }

  const relancamentoAlterado =
    //expressão condicional - usada para atribuir um valor a uma variável com base em uma condição.
    filme.data_relancamento === null
      ? null
      : moment(data_relancamento.value).format("YYYY-MM-DD");


  let atores = JSON.parse(localStorage.getItem('atores'))

  let arrayAtores = []
  atores.forEach(element => {
    let json = {}
    json.id = Number(element.id)
    json.personagem = element.personagem
    arrayAtores.push(json)
  });

  let diretores = JSON.parse(localStorage.getItem('diretores'))

  let arrayDiretores = []

  diretores.forEach(element => {
    let json = {}
    json.id = Number(element.id)
    json.tipo_direcao = element.tipo_direcao
    arrayDiretores.push(json)
  });


  const filmeAlterado = {
    id: id,
    nome: tituloAlterado,
    sinopse: sinopseAlterado,
    duracao: duracaoAlterado,
    data_lancamento: lancamentoAlterado,
    data_relancamento: relancamentoAlterado,
    foto_capa: imgAlterado,
    foto_fundo: backgroundAlterado,
    valor_unitario: parseFloat(precoAlterado),
    destaque: destaqueAlterado,
    id_classificacao: parseInt(classificacaoAlterada),
    id_genero: generos,
    atores: arrayAtores,
    diretores:arrayDiretores
  }

  let isEdited = await putFilme(filmeAlterado);

  if (isEdited) {
    localStorage.clear()
    alert("Filme editado com sucesso!");
  }
});
