import { deleteFilme, getFilme } from "../../filmes.js";
import { getGeneros } from "../../../generos.js";
import { filmeAtor, getAtores } from "../../../atores.js";
import { getDiretores, filmeDiretores } from "../../../diretores.js";

const foto_capa = document.getElementById("capa-dropzone-file");
const foto_fundo = document.getElementById("bg-dropzone-file");
const deletar = document.getElementById("deletar_filme");
const titulo = document.getElementById("title");
const preco = document.getElementById("price");
const data_lancamento = document.getElementById("data_lancamento");
const data_relancamento = document.getElementById("data_relancamento");
const img = document.getElementById("foto");
const duracao = document.getElementById("duration");
const sinopse = document.getElementById("sinopse");
const destaque = document.getElementById("destaque");
const imgBackground = document.getElementById("foto-bg");
const classificacao = document.getElementById("classificacao");

let id = JSON.parse(localStorage.getItem("filme"));
let filme = await getFilme(id);

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

const atoresContainer = document.getElementById("atoresContainer");
const diretoresContainer = document.getElementById("diretoresContainer");
const checkedGeneros = []


async function exibirInformacoes() {
  try {
    exibirdetalhesFilme(filme)
    exibirGeneros()
    exibirAtores()
    exibirDiretores()
  } catch (error) {
    return("Erro ao exibir informações:", error);
  }
}

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

async function exibirdetalhesFilme(filme){
  try {

    titulo.value = filme.nome;
    preco.value = filme.valor_unitario.toFixed(2);
    sinopse.textContent = filme.sinopse;
    img.src = filme.foto_capa;
    imgBackground.src = filme.foto_fundo;
    duracao.value = moment.utc(filme.duracao).format("HH:mm:ss");
    classificacao.value = filme.classificacao[0].faixa_etaria;

    //moment - biblioteca JavaScript para manipulação, formatação e análise de datas e horas em JavaScript
    data_lancamento.value = moment(filme.data_lancamento).format("YYYY-MM-DD");

    if (filme.data_relancamento == null) {
      data_relancamento.disabled = true;
    } else {
      data_relancamento.disabled = false;
      data_relancamento.value = moment(filme.data_relancamento).format(
        "YYYY-MM-DD"
      );
    }

    if (filme.destaque == true) {
      destaque.checked = true;
    } else {
      destaque.checked = false;
    }
  } catch (error) {
    console.error("Erro ao exibir informações:", error);
  }
}

async function exibirGeneros(){
  try {
    let generos = await getGeneros();
    const listaGeneros = document.getElementById("ul-list");

    listaGeneros.addEventListener('change', (event) => {
      const checkbox = event.target;
      const generoId = checkbox.id;

      if (checkbox.type === 'checkbox' && checkbox.checked) {
        
        checkedGeneros.push(generoId.split('-')[0])
        console.log('id do gênero selecionado:', checkedGeneros);
        localStorage.setItem('generos', JSON.stringify(checkedGeneros))
      } else {
        
        const index = checkedGeneros.indexOf(generoId.split('-')[0])
        checkedGeneros.splice(index, 1)
        console.log('id do gênero desmarcado:', checkedGeneros);
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

      // Verificar se o gênero está presente nos gêneros do filme
      if (filme.genero.some((genre) => genre.nome === element.nome)) {
        inputGenero.checked = true;
      }

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
    });
  } catch (error) {
    return error
  }
}

let dadosAtores = await filmeAtor(id);
let atores = dadosAtores.atores;
let todosAtores = await getAtores();

async function exibirAtores(){
  try {
  
    atores.forEach((ator) => {
      if (todosAtores.atores.some((actor) => actor.id === ator.id)) {
        // Criar div
        const div = document.createElement("div");
        div.classList.add(
          "flex",
          "flex-row",
          "w-full",
          "h-3/5",
          "justify-evenly"
        );

        // Criar input para o nome do ator
        const selectAtor = document.createElement("select");
        const inputNomeAtor = document.createElement("option");

        inputNomeAtor.classList.add(
          "nomeAtor",
          "p-2",
          "border",
          "border-gray-300",
          "rounded-md",
          "h-full"
        );
    
        inputNomeAtor.value = ator.id;
        inputNomeAtor.textContent = ator.nome

        selectAtor.appendChild(inputNomeAtor);

        todosAtores.atores.forEach((actor) => {
          if (actor.id === ator.id) return
          const option = document.createElement("option");
          option.value = actor.id;
          option.textContent = actor.nome;
          selectAtor.appendChild(option);
        });
        div.appendChild(selectAtor)

        
        // Criar input para o personagem do ator
        const inputPersonagemAtor = document.createElement("input");
        inputPersonagemAtor.type = "text";
        inputPersonagemAtor.classList.add(
          "personagemAtor",
          "p-2",
          "border",
          "border-gray-300",
          "rounded-md",
          "h-full"
        );
        inputPersonagemAtor.placeholder = "Personagem";
        inputPersonagemAtor.required = true;
        inputPersonagemAtor.value = ator.personagem;

        // Adicionar inputs à div
        //div.appendChild(inputNomeAtor);
        div.appendChild(inputPersonagemAtor);

        // Adicionar div ao elemento pai
        atoresContainer.appendChild(div);
      }
    });
  } catch (error) {
    return error
  }
}

async function exibirDiretores() {
  try {
    let todosDiretores = await getDiretores();
 
    let dadosDiretores = await filmeDiretores(id);
    let diretores = dadosDiretores.diretores;
    
    diretores.forEach((diretor) => {
      
      if (
        todosDiretores.diretores.some((director) => director.id == diretor.id)
      ) {
        // Criar div
        const div = document.createElement("div");
        div.classList.add("flex", "flex-row", "w-full", "h-3/5", "justify-evenly");

        // // Criar input para o nome do diretor
        const selectDiretor = document.createElement("select");
        const inputNomeDiretor = document.createElement("option");
        inputNomeDiretor.classList.add(
          "nomeAtor",
          "p-2",
          "border",
          "border-gray-300",
          "rounded-md",
          "h-full"
        );
       
        inputNomeDiretor.value = diretor.id;
        inputNomeDiretor.textContent = diretor.nome

        selectDiretor.appendChild(inputNomeDiretor);

        todosDiretores.diretores.forEach((director) => {
       
          if (director.id === diretor.id) return
          const option = document.createElement("option");
          option.value = director.id;
          option.textContent = director.nome;
          selectDiretor.appendChild(option);
        });
        div.appendChild(selectDiretor)

        // // Criar input para a contribuição do diretor
        const inputContribuicaoDiretor = document.createElement("input");
        inputContribuicaoDiretor.type = "text";
        inputContribuicaoDiretor.classList.add("contribuicaoDiretor", "p-2", "border", "border-gray-300", "rounded-md", "h-full");
        inputContribuicaoDiretor.placeholder = "Atribuição";
        inputContribuicaoDiretor.required = true;
        inputContribuicaoDiretor.value = diretor.tipo_direcao

        // // Adicionar inputs à div
        div.appendChild(inputContribuicaoDiretor);
        
        // // Adicionar div ao elemento pai
        diretoresContainer.appendChild(div);
      }
    });
  } catch (error) {
    return error
  }
}

const adicionarAtorBtn = document.getElementById("adicionarAtor");
adicionarAtorBtn.addEventListener("click", adicionarCampoAtor);
function adicionarCampoAtor() {
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

const atualizarElencoBtn = document.getElementById('atualizarElenco')
atualizarElencoBtn.addEventListener('click', () =>{
  localStorage.setItem('atores', JSON.stringify())
} )
exibirInformacoes();

let fileImg
    fileImg = foto_capa.files[0];
    
    let foto
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

    let fileImgBackground;
    
    fileImgBackground = foto_fundo.files[0];
    
    let fotoBg;
    let fileBg = foto_fundo.files[0];
    
    if (fileBg) {
      const reader = new FileReader();
      
      reader.addEventListener("load", (e) => {
        const render = e.target;
        const img = document.getElementById("foto-bg");
        foto = render.result;
        img.src = fotoBg;
      });
      reader.readAsDataURL(file);
    }


deletar.addEventListener("click", async () => {
  let id = filme.id;
  let confirmacao = confirm("Tem certeza que deseja concluir essa ação?");

  if (confirmacao) {
    await deleteFilme(id);
    window.location.href = "../html/index.html";
  } else {
  }
});
