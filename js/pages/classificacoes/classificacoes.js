import { getClassificacoes } from "../../classificacoes.js";


async function criarCard(classificacoes) {
    let idClassificacao = classificacoes.id;

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
    innerDiv1.classList.add("flex", "flex-row", "w-9/12", "place-items-center");

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
    innerLi1.textContent = idClassificacao;

    const innerLi2 = document.createElement("li");
    innerLi2.textContent = classificacoes.faixa_etaria;
    innerLi2.classList.add("truncate")

    const innerLi3 = document.createElement("li");
    innerLi3.textContent = classificacoes.classificacao;
    innerLi3.classList.add("truncate")

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
    linkEditar.href = "./verify_classificacoes.html";

    const imgEditar = document.createElement("img");
    imgEditar.src = "../img/edit.svg";
    imgEditar.alt = "botão de editar";
    buttonEditar.addEventListener('click', () => {
        localStorage.setItem('classificacao', JSON.stringify(idClassificacao))
    })

    const buttonVerificar = document.createElement("button");
    buttonVerificar.id = "verificar_info";

    const linkVerificar = document.createElement("a");
    linkVerificar.href = "./verify_classificacoes.html";

    const imgVerificar = document.createElement("img");
    imgVerificar.src = "../img/verify.svg";
    imgVerificar.alt = "botão de verificar informações";
    buttonVerificar.addEventListener('click', () => {
        localStorage.setItem('classificacao', JSON.stringify(idClassificacao))
    })

    const buttonDeletar = document.createElement("button");
    buttonDeletar.id = "deletar_info";


    const linkDeletar = document.createElement("a");
    linkDeletar.href = "./verify_classificacoes.html";

    const imgDeletar = document.createElement("img");
    imgDeletar.src = "../img/delete.svg";
    imgDeletar.alt = "botão de deletar";
    buttonDeletar.addEventListener('click', () => {
        localStorage.setItem('classificacao', JSON.stringify(idClassificacao))
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
    innerDiv1.appendChild(innerUl1);
    card.append(innerDiv1, innerDiv3);

    buttonEditar.addEventListener("click", function () {
        localStorage.setItem("classificacao", JSON.stringify(idClassificacao));
    });

    buttonVerificar.addEventListener("click", function () {
        localStorage.setItem("classificacao", JSON.stringify(idClassificacao));
    });

    buttonDeletar.addEventListener("click", function () {
        localStorage.setItem("classificacao", JSON.stringify(idClassificacao));
    });

    return card;
}

const input = document.getElementById("busca");
input.addEventListener("input", async () => {
  const teclado = input.value.toLowerCase();

  const classificacoes = await getClassificacoes();

  for (let i = 0; i < classificacoes.length; i++) {
    const classificacao = classificacoes[i];

    const classificacaoFaixa = classificacao.faixa_etaria.toLowerCase();

    if (classificacaoFaixa.includes(teclado)) {
      showGenero(classificacao);
    }
  }
});

async function showGenero(classificacao) {
    const dashboard = document.getElementById("dashboard");
  
    const card = await criarCard(classificacao);
  
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
  
    const classificacoes = await getClassificacoes();

    classificacoes.forEach(async (classificacao) => {

      const card = await criarCard(classificacao);
      dashboard.appendChild(card);
    });
  }
  preencherContainer();
