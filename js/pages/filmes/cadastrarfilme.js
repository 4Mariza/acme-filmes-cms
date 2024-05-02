import { postFilme } from "../../filmes.js"
import { uploadImgur } from "../../imgur.js";
import { getGeneros } from "../../../generos.js";
import { getAtores } from "../../../atores.js";
import { getDiretores } from "../../../diretores.js";

const foto_capa = document.getElementById("capa-dropzone-file")
const foto_fundo = document.getElementById("bg-dropzone-file")
const checkedGeneros = []

const titulo = document.getElementById("title")
const preco = document.getElementById("price")
const lancamento = document.getElementById("data_lancamento")
const duracao = document.getElementById("duration")
const sinopse = document.getElementById("sinopse")
const relancamento = document.getElementById("data_relancamento")

const dropdownButton = document.getElementById("dropdownSearchButton");
const dropdownMenu = document.getElementById("dropdownSearch");
// Adiciona um evento de clique ao botão para alternar a visibilidade do dropdown
dropdownButton.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

// Fecha o dropdown quando se clica fora dele
document.addEventListener("click", function (event) {
  if (
    !dropdownButton.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.add("hidden");
  }
});

const elencoBotao = document.getElementById("ator-diretor");
const formularioAdicionar = document.getElementById("formularioAdicionar");

elencoBotao.addEventListener("click", () => {
  if (formularioAdicionar.classList.contains("hidden")) {
    formularioAdicionar.classList.remove("hidden");
    formularioAdicionar.classList.add("block");
  } else {
    formularioAdicionar.classList.remove("block");
    formularioAdicionar.classList.add("hidden");
  }
});

async function exibirGeneros(){
    try {
      let generos = await getGeneros();
      const listaGeneros = document.getElementById("ul-list");

      listaGeneros.addEventListener('change', (event) => {
        const checkbox = event.target;
        const generoId = checkbox.id; // Obtém o nome do gênero

        if (checkbox.type === 'checkbox' && checkbox.checked) {
          // O checkbox foi marcado
       
          checkedGeneros.push(generoId.split('-')[0])
          console.log('Nome do gênero selecionado:', checkedGeneros);
        } else {
          // O checkbox foi desmarcado
          const index = checkedGeneros.indexOf(generoId.split('-')[0])
          checkedGeneros.splice(index, 1)
          console.log('Nome do gênero desmarcado:', checkedGeneros);
        }
      });
  
      generos.forEach((element) => {
        
        // Criar o elemento li
        const li = document.createElement("li");
  
        // Criar o elemento div
        const divGenero = document.createElement("div");
        divGenero.classList.add(
          "flex",
          "items-center",
          "p-2",
          "rounded",
          "hover:bg-gray-100",
          "dark:hover:bg-gray-600"
        );
  
        // Criar o elemento input (checkbox)
        const inputGenero = document.createElement("input");
        inputGenero.id = `${element.id}-${element.nome}`;
        inputGenero.type = "checkbox";
        inputGenero.value = "";
  
        inputGenero.classList.add(
          "w-4",
          "h-4",
          "text-blue-600",
          "bg-gray-100",
          "border-gray-300",
          "rounded",
          "focus:ring-blue-500",
          "dark:focus:ring-blue-600",
          "dark:ring-offset-gray-700",
          "dark:focus:ring-offset-gray-700",
          "focus:ring-2",
          "dark:bg-gray-600",
          "dark:border-gray-500"
        );
  
        // Criar o elemento label
        const labelGenero = document.createElement("label");
        labelGenero.setAttribute("for", element.nome);
        labelGenero.innerText = element.nome;
        labelGenero.classList.add(
          "w-full",
          "ms-2",
          "text-sm",
          "font-medium",
          "text-gray-900",
          "rounded",
          "dark:text-gray-300"
        );
  
        // Adicionar o input e o label dentro da div
        divGenero.appendChild(inputGenero);
        divGenero.appendChild(labelGenero);
  
        // Adicionar a div dentro do li
        li.appendChild(divGenero);
  
        // Adicionar o li à lista de gêneros

        listaGeneros.appendChild(li);

        
    })  
  }catch (error) {
    return error
  }
} 
exibirGeneros()

let fileImg 
let fileImgBackground 

foto_capa.addEventListener("change", async () => {
    fileImg = foto_capa.files[0]

    let foto 
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

foto_fundo.addEventListener("change", async () => {
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

const adicionarAtorBtn = document.getElementById("adicionarAtor");
adicionarAtorBtn.addEventListener("click", adicionarCampoAtor);
async function adicionarCampoAtor() {
  let todosAtores = await getAtores();
  const novoCampoAtor = document.createElement("div");
  novoCampoAtor.classList.add(
    "flex",
    "flex-row",
    "w-full",
    "h-3/5",
    "justify-evenly"
  );
  const selectAtor = document.createElement("select");
  todosAtores.atores.forEach(actor => {
    const option = document.createElement("option");
    option.value = actor.id;
    option.textContent = actor.nome;
    selectAtor.appendChild(option);
  })
  const personagemAtor = document.createElement("input");
  personagemAtor.classList.add("personagemAtor", "p-2", "border", "border-gray-300", "rounded-md", "h-full")
  personagemAtor.placeholder = "Personagem"
  novoCampoAtor.appendChild(selectAtor)
  novoCampoAtor.appendChild(personagemAtor)
  atoresContainer.appendChild(novoCampoAtor);
}

const adicionarDiretorBtn = document.getElementById("adicionarDiretor");
adicionarDiretorBtn.addEventListener("click", adicionarCampoDiretor);
async function adicionarCampoDiretor() {
  let todosDiretores = await getDiretores();

  const novoCampoDiretor = document.createElement("div");
  novoCampoDiretor.classList.add(
    "flex",
    "flex-row",
    "w-full",
    "h-3/5",
    "justify-evenly"
  );

  const selectDiretor = document.createElement("select");
  todosDiretores.diretores.forEach(director => {
    const option = document.createElement("option");
    option.value = director.id;
    option.textContent = director.nome;
    selectDiretor.appendChild(option);
  })

  const personagemDiretor = document.createElement("input");
  personagemDiretor.classList.add("personagemAtor", "p-2", "border", "border-gray-300", "rounded-md", "h-full")
  personagemDiretor.placeholder = "Personagem"
  novoCampoDiretor.appendChild(selectDiretor)
  novoCampoDiretor.appendChild(personagemDiretor)
  diretoresContainer.appendChild(novoCampoDiretor);
}

const cadastrar = document.getElementById("cadastrar_filme")

cadastrar.addEventListener('click', async () => {
    let filme = {}

   const urlImgBackground = await uploadImgur(fileImgBackground)

   const urlImg = await uploadImgur(fileImg)

   filme = {
    nome : titulo.value,
    valor_unitario : preco.value,
    sinopse : sinopse.value,
    foto_capa : urlImg,
    foto_fundo : urlImgBackground,
    duracao : `${duracao.value}`,
    data_lancamento : lancamento.value,
    data_relancamento : relancamento ? relancamento.value : null,
    generos: listaGeneros
}
   
    console.log(filme);
    await postFilme(filme)

})
