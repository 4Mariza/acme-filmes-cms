import { getNacionalidades } from "../../atores.js";
import { uploadImgur } from "../../imgur.js";
import {inserirDiretor} from "../../diretores.js"

const img = document.getElementById("foto");
const foto = document.getElementById("foto-dropzone-file");
const nome = document.getElementById("nome");
const sexoFeminino = document.getElementById("feminino");

const checkedNacionalidades = [];

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

async function exibirNacionalidade() {
  try {

    let nacionalidades = await getNacionalidades();
    const listaNacionalidades = document.getElementById("ul-list");

    listaNacionalidades.addEventListener("change", (event) => {
      const checkbox = event.target;
      const nacionalidadeId = checkbox.id;

      if (checkbox.type === "checkbox" && checkbox.checked) {
        checkedNacionalidades.push(nacionalidadeId.split("-")[0]);
        console.log("id selecionado:", checkedNacionalidades);
        localStorage.setItem(
          "nacionalidades",
          JSON.stringify(checkedNacionalidades)
        );
      } else {
        const index = checkedNacionalidades.indexOf(
          nacionalidadeId.split("-")[0]
        );
        checkedNacionalidades.splice(index, 1);
        console.log("id desmarcado:", checkedNacionalidades);
      }
    });

    nacionalidades.forEach((element) => {
      // Criar o elemento li
      const li = document.createElement("li");

      // Criar o elemento div
      const divNacionalidade = document.createElement("div");
      divNacionalidade.classList.add(
        "flex",
        "items-center",
        "p-2",
        "rounded",
        "hover:bg-gray-100",
        "dark:hover:bg-gray-600"
      );

      // Criar o elemento input (checkbox)
      const inputNacionalidade = document.createElement("input");
      inputNacionalidade.id = `${element.id}`;
      inputNacionalidade.type = "checkbox";
      inputNacionalidade.value = "";

      inputNacionalidade.classList.add(
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
      const labelNacionalidade = document.createElement("label");
      labelNacionalidade.setAttribute("for", element.nome);
      labelNacionalidade.innerText = element.nome;
      labelNacionalidade.classList.add(
        "w-full",
        "ms-2",
        "text-xl",
        "font-medium",
        "text-gray-900",
        "rounded",
        "dark:text-gray-300"
      );

      // Adicionar o input e o label dentro da div
      divNacionalidade.appendChild(inputNacionalidade);
      divNacionalidade.appendChild(labelNacionalidade);

      // Adicionar a div dentro do li
      li.appendChild(divNacionalidade);

      // Adicionar o li à lista de gêneros
      listaNacionalidades.appendChild(li);
    });
  } catch (error) {
    return error;
  }
}

let fotoDiretor;

foto.addEventListener("change", () => {
  let file = foto.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const render = e.target;
      fotoDiretor = render.result;
      img.src = fotoDiretor;
    });
    reader.readAsDataURL(file);
  }
});

const cadastrar = document.getElementById("cadastrar_diretor");

cadastrar.addEventListener("click", async () => {
  let diretor = {};

  let urlImg = diretor.foto;

  if (foto.files.length > 0) {
    urlImg = await uploadImgur(foto.files[0]);
  }

  let fotoDiretor;
  foto.addEventListener("change", () => {
    let file = foto.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const render = e.target;
        fotoDiretor = render.result;
        img.src = fotoDiretor;
      });
      reader.readAsDataURL(file);
    }
  });

  let sexo
  if(sexoFeminino.checked == true){
    sexo = 1
  } else {
    sexo = 2
  }

  let nacionalidades = JSON.parse(localStorage.getItem('nacionalidades'))

  let arrayNacionalidades = []
  nacionalidades.forEach(element => {
    arrayNacionalidades.push(Number(element))
  });
  
  diretor = {
    nome : nome.value, 
    foto: urlImg,
    id_sexo: sexo,
    nacionalidade: arrayNacionalidades
  }

 let isPosted = await inserirDiretor(diretor)

 if (isPosted) {
    localStorage.clear()
    alert("Diretor cadastrado com sucesso!");
 }
});

exibirNacionalidade()
