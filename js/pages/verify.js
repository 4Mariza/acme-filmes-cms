const foto_capa = document.getElementById("capa-dropzone-file")
const foto_fundo = document.getElementById("bg-dropzone-file")
const editar = document.getElementById("editar_filme")
const deletar = document.getElementById("deletar_filme")
const titulo = document.getElementById("title")
const preco = document.getElementById("price")
const data_lancamento = document.getElementById("data_lancamento")
const data_relancamento = document.getElementById("data_relancamento")
const img = document.getElementById("foto")
const duracao = document.getElementById("duration")
const sinopse = document.getElementById("sinopse")
const destaque = document.getElementById("destaque")
const imgBackground = document.getElementById("foto-bg")
const classificacao = document.getElementById("classificacao")
const lista_generos = document.getElementById("ul-list")

let id = JSON.parse(localStorage.getItem("filme"));
let filme = await getFilme(id);

import { putFilme, deleteFilme, getFilme } from "../filmes.js"
import { getGeneros } from "../../generos.js"
import { uploadImgur } from "../imgur.js";

async function exibirInformacoes() {
  try {
    let generos = await getGeneros();

    console.log(filme);
    titulo.value = filme.nome;
    preco.value = filme.valor_unitario.toFixed(2);
    sinopse.textContent = filme.sinopse;
    img.src = filme.foto_capa;
    imgBackground.src = filme.foto_fundo;
    duracao.value = moment.utc(filme.duracao).format("HH:mm:ss");
    classificacao.value = filme.classificacao[0].faixa_etaria;

    generos.forEach(element => {
      // Criar o elemento li
      const li = document.createElement("li");

      // Criar o elemento div
      const divGenero = document.createElement("div");
      divGenero.classList.add("flex", "items-center", "p-2", "rounded", "hover:bg-gray-100", "dark:hover:bg-gray-600");

      // Criar o elemento input (checkbox)
      const inputGenero = document.createElement("input");
      inputGenero.id = element.nome;
      inputGenero.type = "checkbox";
      inputGenero.value = "";

      // Verificar se o gênero está presente nos gêneros do filme
      if (filme.genero.some(genre => genre.nome === element.nome)) {
        inputGenero.checked = true;
      }

      inputGenero.classList.add("w-4", "h-4", "text-blue-600", "bg-gray-100", "border-gray-300", "rounded", "focus:ring-blue-500", "dark:focus:ring-blue-600", "dark:ring-offset-gray-700", "dark:focus:ring-offset-gray-700", "focus:ring-2", "dark:bg-gray-600", "dark:border-gray-500");

      // Criar o elemento label
      const labelGenero = document.createElement("label");
      labelGenero.setAttribute("for", element.nome);
      labelGenero.innerText = element.nome;
      labelGenero.classList.add("w-full", "ms-2", "text-sm", "font-medium", "text-gray-900", "rounded", "dark:text-gray-300");

      // Adicionar o input e o label dentro da div
      divGenero.appendChild(inputGenero);
      divGenero.appendChild(labelGenero);

      // Adicionar a div dentro do li
      li.appendChild(divGenero);

      // Adicionar o li à lista de gêneros
      lista_generos.appendChild(li);
    });

    //moment - biblioteca JavaScript para manipulação, formatação e análise de datas e horas em JavaScript
    data_lancamento.value = moment(filme.data_lancamento).format("YYYY-MM-DD")

    if (filme.data_relancamento == null) {
      data_relancamento.disabled = true
    } else {
      data_relancamento.disabled = false
      data_relancamento.value = moment(filme.data_relancamento).format("YYYY-MM-DD")
    }

    if (filme.destaque == true) {
      destaque.checked = true
    } else {
      destaque.checked = false
    }
  } catch (error) {
    console.error("Erro ao exibir informações:", error);
  }
}

const dropdownButton = document.getElementById('dropdownSearchButton');
const dropdownMenu = document.getElementById('dropdownSearch');
// Adiciona um evento de clique ao botão para alternar a visibilidade do dropdown
dropdownButton.addEventListener('click', function () {
  dropdownMenu.classList.toggle('hidden');
});

// Fecha o dropdown quando se clica fora dele
document.addEventListener('click', function (event) {
  if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
    dropdownMenu.classList.add('hidden');
  }
});
exibirInformacoes()

let fileImg
let fileImgBackground

editar.addEventListener("click", async () => {
  let id = JSON.parse(localStorage.getItem("filme"))
  let filme = await getFilme(id)

  let urlImg = filme.foto_capa;
  let urlImgBackground = filme.foto_fundo;

  if (foto_capa.files.length > 0) {
    urlImg = await uploadImgur(foto_capa.files[0]);
  }

  if (foto_fundo.files.length > 0) {
    urlImgBackground = await uploadImgur(foto_fundo.files[0]);
  }

  let foto
  foto_capa.addEventListener("change", () => {
    fileImg = foto_capa.files[0]

    let file = foto_capa.files[0]

    if (file) {
      const reader = new FileReader()

      reader.addEventListener("load", (e) => {
        const render = e.target
        const img = document.getElementById("foto")
        foto = render.result
        img.src = foto
      })
      reader.readAsDataURL(file)
    }
  })

  foto_fundo.addEventListener("change", () => {
    fileImgBackground = foto_fundo.files[0]

    let foto
    let file = foto_fundo.files[0]

    if (file) {
      const reader = new FileReader()

      reader.addEventListener("load", (e) => {
        const render = e.target
        const img = document.getElementById("foto-bg")
        foto = render.result
        img.src = foto
      })
      reader.readAsDataURL(file)
    }
  })


  const tituloAlterado = titulo.value
  const precoAlterado = preco.value
  const sinopseAlterado = sinopse.value
  const imgAlterado = urlImg
  const backgroundAlterado = urlImgBackground
  const duracaoAlterado = duracao.value
  const lancamentoAlterado = moment(filme.data_lancamento).format("YYYY-MM-DD")
  const destaqueAlterado = destaque.checked
  const classificacaoAlterada = classificacao.value
  const relancamentoAlterado =
    //expressão condicional - usada para atribuir um valor a uma variável com base em uma condição.
    filme.data_relancamento === null ? null : moment(filme.data_relancamento).format("YYYY-MM-DD")

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
    id_classificacao: parseInt(classificacaoAlterada)
  }

  let isEdited = await putFilme(filmeAlterado)

  if (isEdited) {
    alert('Filme editado com sucesso!')
  }
})

deletar.addEventListener("click", async () => {
  let id = filme.id
  let confirmacao = confirm("Tem certeza que deseja concluir essa ação?")

  if (confirmacao) {
    await deleteFilme(id)
    window.location.href = "../html/index.html"
  } else {
  }
})
