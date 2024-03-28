"use strict";

import {
    getFilmes,
    getFilme,
    postFilme,
    putFilme,
    deleteFilme,
    getFilmebyTitle,
} from "./filmes.js";


async function criarCard(filmes) {

    const card = document.createElement("div");
    card.classList.add("flex", "flex-row", "w-full", "h-16", "rounded-t-lg", "justify-between", "card");

    const innerDiv1 = document.createElement("div");
    innerDiv1.classList.add("flex", "flex-row", "w-5/12", "place-items-center");

    const innerUl1 = document.createElement("ul");
    innerUl1.classList.add("flex", "flex-row", "w-full", "text-white", "text-2xl", "place-items-center", "truncate", "justify-evenly");

    const innerLi1 = document.createElement("li");
    innerLi1.textContent = filmes.id;

    const innerLi2 = document.createElement("li");
    innerLi2.textContent = filmes.nome;

    const innerDiv2 = document.createElement("div");
    innerDiv2.classList.add("flex", "flex-row", "w-5/12");

    const innerUl2 = document.createElement("ul");
    innerUl2.classList.add("flex", "flex-row", "w-full", "text-white", "text-2xl", "place-items-center", "justify-between", "pr-12");

    const innerLi3 = document.createElement("li");
    innerLi3.textContent = "Destaque";

    const innerLi4 = document.createElement("li");
    innerLi4.textContent = filmes.valor_unitario;

    const innerDiv3 = document.createElement("div");
    innerDiv3.classList.add("flex", "flex-row", "w-28", "justify-between");

    const buttonEditar = document.createElement("button");
    buttonEditar.id = "editar_info";
    buttonEditar.type = "button"

    const linkEditar = document.createElement("a");
    linkEditar.href = "./verify.html"

    const imgEditar = document.createElement("img");
    imgEditar.src = "../img/edit.svg";
    imgEditar.alt = "botão de editar";

    const buttonVerificar = document.createElement("button");
    buttonVerificar.id = "verificar_info";

    const linkVerificar = document.createElement("a");

    const imgVerificar = document.createElement("img");
    imgVerificar.src = "../img/verify.svg";
    imgVerificar.alt = "botão de verificar informações";

    const buttonDeletar = document.createElement("button");
    buttonDeletar.id = "deletar_info";

    const linkDeletar = document.createElement("a");

    const imgDeletar = document.createElement("img");
    imgDeletar.src = "../img/delete.svg";
    imgDeletar.alt = "botão de deletar";


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
    
    innerUl1.append(innerLi1, innerLi2)
    innerUl2.append(innerLi3, innerLi4, innerDiv3);
    innerDiv2.appendChild(innerUl2);
    innerDiv1.appendChild(innerUl1);
    card.append(innerDiv1, innerDiv2);
    
    buttonEditar.addEventListener('click', function () {
        localStorage.setItem('filme', JSON.stringify(filmes))
    })

    // buttonVerificar.addEventListener('click', function (event) {
    //     event.preventDefault()
    //     window.location.href = "./verify.html"
    //     showMoreInfo(filmes)
    // })

    // buttonDeletar.addEventListener('click', function (event) {
    //     event.preventDefault()
    //     window.location.href = "./verify.html"
    //     showMoreInfo(filmes)
    // })


    return card;
}

async function preencherContainer() {
    const dashboard = document.getElementById('dashboard');

    const filmes = await getFilmes()

    filmes.forEach(async filme => {
        const card = await criarCard(filme)
        dashboard.appendChild(card)
    })
}
preencherContainer()

async function showMovie(filme) {
    const dashboard = document.getElementById('dashboard');

    const card = await criarCard(filme)

    dashboard.replaceChildren(card)
}

const input = document.getElementById('busca')
input.addEventListener('keypress', (event) => verifyKeyPress(event))

function verifyKeyPress(event) {

    if (event.keyCode === 13) {
        event.preventDefault()

        const filme = input.value
        buscaFilme(filme)
    }
}


async function buscaFilme(titulo) {

    const filmeNome = titulo

    const filme = await getFilmebyTitle(filmeNome)

    showMovie(filme)
}
