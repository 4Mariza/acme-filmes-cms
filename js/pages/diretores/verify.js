import { getDiretorById } from "../../diretores.js";
import { getNacionalidades } from "../../atores.js";

const img = document.getElementById("foto");
const nome = document.getElementById('nome')
const sexoFeminino = document.getElementById('feminino')
const sexoMasculino = document.getElementById('masculino')

let id = JSON.parse(localStorage.getItem("diretor"));
const checkedNacionalidades = []

const dropdownButton = document.getElementById("dropdownSearchButton");
const dropdownMenu = document.getElementById("dropdownSearch");
// Adiciona um evento de clique ao botão para alternar a visibilidade do dropdown
dropdownButton.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
});

document.addEventListener("click", function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

async function exibirInformacoes(){
    let diretor = await getDiretorById(id)

    img.src = diretor.foto
    nome.value = diretor.nome
  
    if(diretor.sexo[0].sigla == 'F'){
        sexoFeminino.checked = true
    } else {
        sexoMasculino.checked = true
    }

    exibirNacionalidade()
}

async function exibirNacionalidade(){
    try {
        let diretor = await getDiretorById(id)
        let nacionalidades = await getNacionalidades();
        const listaNacionalidades = document.getElementById("ul-list");
    
        listaNacionalidades.addEventListener('change', (event) => {
          const checkbox = event.target;
          const nacionalidadeId = checkbox.id;
    
          if (checkbox.type === 'checkbox' && checkbox.checked) {
    
            checkedNacionalidades.push(nacionalidadeId.split('-')[0])
            localStorage.setItem('nacionalidades', JSON.stringify(checkedNacionalidades))
          } else {
    
            const index = checkedNacionalidades.indexOf(nacionalidadeId.split('-')[0])
            checkedNacionalidades.splice(index, 1)
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
    
          // Verificar se o gênero está presente nos gêneros do filme
          if (diretor.nacionalidade.some((nacionality) => nacionality.nome === element.nome)) {
            inputNacionalidade.checked = true;
            checkedNacionalidades.push(Number(inputNacionalidade.id))
            localStorage.setItem('nacionalidades', JSON.stringify(checkedNacionalidades))
          }
    
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
    }catch(error){
        return error
    }
}

let fotoDiretor;
const foto = document.getElementById('foto-dropzone-file')
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


exibirInformacoes()