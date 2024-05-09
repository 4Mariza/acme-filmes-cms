
import { getDiretores } from "../../diretores.js";

async function criarCard(diretores) {
  let idDiretor = diretores.id;
  let sexo;

  for (let i = 0; i < diretores.sexo.length; i++) {
    const item = diretores.sexo[i];

    if (item) {
      sexo = item.sigla;
    }
  }

  let nacionalidade = [];
  for (let i = 0; i < diretores.nacionalidade.length; i++) {
    const item = diretores.nacionalidade[i];

    if (item) {
      nacionalidade.push(item.nome);
    }
  }

  const card = document.createElement("div");
  card.classList.add(
    "flex",
    "flex-row",
    "w-full",
    "h-16",
    "rounded-t-lg",
    "justify-between",
    "card"
  );

  const innerDiv1 = document.createElement("div");
  innerDiv1.classList.add("flex", "flex-row", "w-5/12", "place-items-center");

  const innerUl1 = document.createElement("ul");
  innerUl1.classList.add(
    "flex",
    "flex-row",
    "w-full",
    "text-white",
    "text-2xl",
    "place-items-center",
    "truncate",
    "justify-evenly",
  );

  const innerLi1 = document.createElement("li");
  innerLi1.textContent = idDiretor;

  const innerLi2 = document.createElement("li");
  innerLi2.textContent = diretores.nome;
  innerLi2.classList.add("truncate")

  const innerDiv2 = document.createElement("div");
  innerDiv2.classList.add("flex", "flex-row", "w-5/12");

  const innerUl2 = document.createElement("ul");
  innerUl2.classList.add(
    "flex",
    "flex-row",
    "w-full",
    "text-white",
    "text-2xl",
    "place-items-center",
    "justify-between",
    "px-24"
  );

  const innerLi5 = document.createElement("li");
  innerLi5.textContent = nacionalidade;

  const innerLi4 = document.createElement("li");
  innerLi4.textContent = sexo;

  const innerDiv3 = document.createElement("div");
  innerDiv3.classList.add(
    "flex",
    "flex-row",
    "w-40",
    "justify-between",
    "mr-8"
  );

  const buttonEditar = document.createElement("button");
  buttonEditar.id = "editar_info";
  buttonEditar.type = "button";

  const linkEditar = document.createElement("a");
  linkEditar.href = "./verify_diretores.html";

  const imgEditar = document.createElement("img");
  imgEditar.src = "../img/edit.svg";
  imgEditar.alt = "botão de editar";
  buttonEditar.addEventListener('click', ()=> {
    localStorage.setItem('diretor', JSON.stringify(idDiretor))
  })

  const buttonVerificar = document.createElement("button");
  buttonVerificar.id = "verificar_info";

  const linkVerificar = document.createElement("a");
  linkVerificar.href = "./verify_diretores.html";

  const imgVerificar = document.createElement("img");
  imgVerificar.src = "../img/verify.svg";
  imgVerificar.alt = "botão de verificar informações";
  buttonVerificar.addEventListener('click', ()=> {
    localStorage.setItem('diretor', JSON.stringify(idDiretor))
  })

  const buttonDeletar = document.createElement("button");
  buttonDeletar.id = "deletar_info";
  

  const linkDeletar = document.createElement("a");
  linkDeletar.href = "./verify_diretores.html";

  const imgDeletar = document.createElement("img");
  imgDeletar.src = "../img/delete.svg";
  imgDeletar.alt = "botão de deletar";
  buttonDeletar.addEventListener('click', ()=> {
    localStorage.setItem('diretor', JSON.stringify(idDiretor))
  })

  // Aninhamento dos elementos
  linkEditar.appendChild(imgEditar);
  buttonEditar.appendChild(linkEditar);
  innerDiv3.appendChild(buttonEditar);

  linkVerificar.appendChild(imgVerificar);
  buttonVerificar.appendChild(linkVerificar);
  innerDiv3.appendChild(buttonVerificar);

  linkDeletar.appendChild(imgDeletar);
  buttonDeletar.appendChild(linkDeletar);
  innerDiv3.appendChild(buttonDeletar);

  innerUl1.append(innerLi1, innerLi2);
  innerUl2.append(innerLi5, innerLi4);
  innerDiv2.appendChild(innerUl2);
  innerDiv1.appendChild(innerUl1);
  card.append(innerDiv1, innerDiv2, innerDiv3);

  buttonEditar.addEventListener("click", function () {
    localStorage.setItem("diretor", JSON.stringify(idDiretor));
  });

  buttonVerificar.addEventListener("click", function () {
    localStorage.setItem("diretor", JSON.stringify(idDiretor));
  });

  buttonDeletar.addEventListener("click", function () {
    localStorage.setItem("diretor", JSON.stringify(idDiretor));
  });

  return card;
}


const input = document.getElementById("busca");
input.addEventListener("input", async () => {
  const teclado = input.value.toLowerCase();

  const diretores = await getDiretores();

  for (let i = 0; i < atores.length; i++) {
    const diretor = diretores[i];

    const diretorNome = diretor.nome.toLowerCase();

    if (diretorNome.includes(teclado)) {
      showAtor(diretor);
    }
  }
});

async function showAtor(diretor) {
  const dashboard = document.getElementById("dashboard");

  const card = await criarCard(diretor);

  dashboard.replaceChildren(card);
}

const navbar = document.getElementById("navbar");

document.addEventListener("mousemove", (event) => {
  if (event.clientX <= 10) {
    navbar.classList.add("left-0");
  } else {
    navbar.classList.add("left-[-300px]");
  }
});

async function preencherContainer() {
  const dashboard = document.getElementById("dashboard");

  const diretores = await getDiretores();

  diretores.forEach(async (diretor) => {
    const card = await criarCard(diretor);
    dashboard.appendChild(card);
  });
}
preencherContainer();
