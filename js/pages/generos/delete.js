import { deleteGenero } from "../../generos.js";

const deletar = document.getElementById('deletar_genero')

deletar.addEventListener("click", async () => {
    let id = JSON.parse(localStorage.getItem("genero"));

    let confirmacao = confirm("Tem certeza que deseja concluir essa ação?");
  
    if (confirmacao) {
      await deleteGenero(id);
      window.location.href = "../../../html/generos.html";
    } else {
    }
  });