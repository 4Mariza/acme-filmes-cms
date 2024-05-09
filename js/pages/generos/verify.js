import { getGeneroById } from "../../generos.js";

const nome = document.getElementById('nome')

let id = JSON.parse(localStorage.getItem("genero"));

async function exibirInformacoes() {
    let genero = await getGeneroById(id)

    nome.value = genero[0].nome
}

exibirInformacoes()