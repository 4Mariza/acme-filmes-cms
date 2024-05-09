import { inserirGenero } from "../../generos.js";

const cadastrar = document.getElementById("cadastrar_genero");
const nome = document.getElementById("nome");

cadastrar.addEventListener('click', async ()=> {
    let genero = {
        nome: nome.value
    }

    let isPosted = await inserirGenero(genero)

    if (isPosted) {
       localStorage.clear()
       alert("Gênero cadastrado com sucesso!");
    }
})