import { getGeneros } from "../../generos.js";


async function criarCard(generos) {
    let idGenero = generos.id;

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
    innerLi1.textContent = idGenero;

    const innerLi2 = document.createElement("li");
    innerLi2.textContent = generos.nome;
    innerLi2.classList.add("truncate")

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
    linkEditar.href = "./verify_generos.html";

    const imgEditar = document.createElement("img");
    imgEditar.src = "../img/edit.svg";
    imgEditar.alt = "botão de editar";
    buttonEditar.addEventListener('click', () => {
        localStorage.setItem('genero', JSON.stringify(idGenero))
    })

    const buttonVerificar = document.createElement("button");
    buttonVerificar.id = "verificar_info";

    const linkVerificar = document.createElement("a");
    linkVerificar.href = "./verify_generos.html";

    const imgVerificar = document.createElement("img");
    imgVerificar.src = "../img/verify.svg";
    imgVerificar.alt = "botão de verificar informações";
    buttonVerificar.addEventListener('click', () => {
        localStorage.setItem('genero', JSON.stringify(idGenero))
    })

    const buttonDeletar = document.createElement("button");
    buttonDeletar.id = "deletar_info";


    const linkDeletar = document.createElement("a");
    linkDeletar.href = "./verify_generos.html";

    const imgDeletar = document.createElement("img");
    imgDeletar.src = "../img/delete.svg";
    imgDeletar.alt = "botão de deletar";
    buttonDeletar.addEventListener('click', () => {
        localStorage.setItem('genero', JSON.stringify(idGenero))
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
    innerDiv1.appendChild(innerUl1);
    card.append(innerDiv1, innerDiv3);

    buttonEditar.addEventListener("click", function () {
        localStorage.setItem("genero", JSON.stringify(idGenero));
    });

    buttonVerificar.addEventListener("click", function () {
        localStorage.setItem("genero", JSON.stringify(idGenero));
    });

    buttonDeletar.addEventListener("click", function () {
        localStorage.setItem("genero", JSON.stringify(idGenero));
    });

    return card;
}

const input = document.getElementById("busca");
input.addEventListener("input", async () => {
  const teclado = input.value.toLowerCase();

  const generos = await getGeneros();

  for (let i = 0; i < generos.length; i++) {
    const genero = generos[i];

    const generoNome = genero.nome.toLowerCase();

    if (generoNome.includes(teclado)) {
      showGenero(genero);
    }
  }
});

async function showGenero(genero) {
    const dashboard = document.getElementById("dashboard");
  
    const card = await criarCard(genero);
  
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
  
    const generos = await getGeneros();
  
    generos.forEach(async (genero) => {
      const card = await criarCard(genero);
      dashboard.appendChild(card);
    });
  }
  preencherContainer();
