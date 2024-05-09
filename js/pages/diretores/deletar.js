import { deleteDiretor } from "../../diretores.js";

const deletar = document.getElementById('deletar_diretor')

deletar.addEventListener("click", async () => {
    let id = JSON.parse(localStorage.getItem("diretor"));

    let confirmacao = confirm("Tem certeza que deseja concluir essa ação?");
  
    if (confirmacao) {
      await deleteDiretor(id);
      window.location.href = "../../../html/diretores.html";
    } else {
    }
  });