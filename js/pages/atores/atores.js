
import { getAtores } from "../../atores.js";

async function criarCard(atores) {
  let idAtor = atores.id;
  let sexo;

  for (let i = 0; i < atores.sexo.length; i++) {
    const item = atores.sexo[i];

    if (item) {
      sexo = item.sigla;
    }
  }

  let nacionalidade = [];
  for (let i = 0; i < atores.nacionalidade.length; i++) {
    const item = atores.nacionalidade[i];

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
  innerLi1.textContent = idAtor;

  const innerLi2 = document.createElement("li");
  innerLi2.textContent = atores.nome;
  innerLi2.classList.add("truncate")

  const innerLi3 = document.createElement("li");
  innerLi3.classList.add("truncate")
  innerLi3.textContent =
    atores.nome_artistico == null ? "-" : atores.nome_artistico;

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
  console.log(sexo);

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
  linkEditar.href = "./verify_atores.html";

  const imgEditar = document.createElement("img");
  imgEditar.src = "../img/edit.svg";
  imgEditar.alt = "botão de editar";
  buttonEditar.addEventListener('click', ()=> {
    localStorage.setItem('ator', JSON.stringify(idAtor))
  })

  const buttonVerificar = document.createElement("button");
  buttonVerificar.id = "verificar_info";

  const linkVerificar = document.createElement("a");
  linkVerificar.href = "./verify_atores.html";

  const imgVerificar = document.createElement("img");
  imgVerificar.src = "../img/verify.svg";
  imgVerificar.alt = "botão de verificar informações";
  buttonVerificar.addEventListener('click', ()=> {
    localStorage.setItem('ator', JSON.stringify(idAtor))
  })

  const buttonDeletar = document.createElement("button");
  buttonDeletar.id = "deletar_info";
  

  const linkDeletar = document.createElement("a");
  linkDeletar.href = "./verify_atores.html";

  const imgDeletar = document.createElement("img");
  imgDeletar.src = "../img/delete.svg";
  imgDeletar.alt = "botão de deletar";
  buttonDeletar.addEventListener('click', ()=> {
    localStorage.setItem('ator', JSON.stringify(idAtor))
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

  innerUl1.append(innerLi1, innerLi2, innerLi3);
  innerUl2.append(innerLi5, innerLi4);
  innerDiv2.appendChild(innerUl2);
  innerDiv1.appendChild(innerUl1);
  card.append(innerDiv1, innerDiv2, innerDiv3);

  buttonEditar.addEventListener("click", function () {
    localStorage.setItem("ator", JSON.stringify(idAtor));
  });

  buttonVerificar.addEventListener("click", function () {
    localStorage.setItem("ator", JSON.stringify(idAtor));
  });

  buttonDeletar.addEventListener("click", function () {
    localStorage.setItem("ator", JSON.stringify(idAtor));
  });

  return card;
}


const input = document.getElementById("busca");
input.addEventListener("input", async () => {
  const teclado = input.value.toLowerCase();

  const atores = await getAtores();

  for (let i = 0; i < atores.length; i++) {
    const ator = atores[i];

    const atorNome = ator.nome.toLowerCase();

    if (atorNome.includes(teclado)) {
      showAtor(ator);
    }
  }
});

async function showAtor(ator) {
  const dashboard = document.getElementById("dashboard");

  const card = await criarCard(ator);

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

  const atores = await getAtores();
  console.log(atores);

  atores.forEach(async (ator) => {
    const card = await criarCard(ator);
    dashboard.appendChild(card);
  });
}
preencherContainer();
