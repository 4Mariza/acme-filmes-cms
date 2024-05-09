import { deletarClassificacao } from "../../classificacoes.js";

const deletar = document.getElementById('deletar_classificacao')

deletar.addEventListener("click", async () => {
    let id = JSON.parse(localStorage.getItem("classificacao"));

    let confirmacao = confirm("Tem certeza que deseja concluir essa ação?");
  
    if (confirmacao) {
      await deletarClassificacao(id);
      window.location.href = "../../../html/classificacoes.html";
    } else {
    }
  });