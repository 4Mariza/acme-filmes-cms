import { putFilme,getFilme } from "../../filmes";
import { uploadImgur } from "../../imgur.js";

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
const classificacao = document.getElementById("classificacao");


let id = JSON.parse(localStorage.getItem("filme"));
const filme = await getFilme(id);


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
  const classificacaoAlterada = classificacao.value;
  const relancamentoAlterado =
    //expressão condicional - usada para atribuir um valor a uma variável com base em uma condição.
    filme.data_relancamento === null
      ? null
      : moment(data_relancamento.value).format("YYYY-MM-DD");

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
  };

  let isEdited = await putFilme(filmeAlterado);

  if (isEdited) {
    alert("Filme editado com sucesso!");
  }
});
