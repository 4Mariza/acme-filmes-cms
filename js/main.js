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
  card.innerHTML = `
    <div class="flex flex-row w-full h-16 rounded-t-lg justify-between" id="dashboard">
    <div class="flex flex-row w-5/12 place-items-center">
        <ul class="flex flex-row w-full text-white text-2xl place-items-center truncate justify-evenly">
            <li>ID</li>
            <li>${filmes.nome}</li>
        </ul>
    </div>
  <div class="flex flex-row  w-5/12">
        <ul class="flex flex-row w-full text-white text-2xl place-items-center justify-between pr-12">
            <li>Destaque</li>
            <li>${filmes.valor_unitario}</li>
            <div class="flex flex-row w-28 justify-between">
                <button>
                    <a href="./verify.html">
                        <img src="../img/edit.svg" alt="botão de editar">
                    </a>
                </button>
                <button>
                    <a href="./verify.html">
                        <img src="../img/verify.svg" alt="botão de verificar informações">
                    </a>
                </button>
                <button>
                    <a href="./delete.html">
                        <img src="../img/delete.svg" alt="botão de deletar">
                    </a>
                </button>
            </div>
        </ul>
    </div>  
</div>
    `;

  return card;
}

async function preencherContainer() {
    const dashboard = document.getElementById('dashboard');
    
    const filmes = await getFilmes()
    
    filmes.forEach(async filme => {
        const card = await criarCard(filme)
        console.log(card);
        dashboard.appendChild(card)
    })
}

preencherContainer()
