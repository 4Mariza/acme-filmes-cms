import { deleteAtor } from "../../atores.js";

const deletar = document.getElementById('deletar_ator')

deletar.addEventListener("click", async () => {
    let id = JSON.parse(localStorage.getItem("ator"));

    let confirmacao = confirm("Tem certeza que deseja concluir essa ação?");
  
    if (confirmacao) {
      await deleteAtor(id);
      window.location.href = "../../../html/atores.html";
    } else {
    }
  });