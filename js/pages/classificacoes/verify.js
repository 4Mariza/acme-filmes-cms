import { getClassificacoes } from "../../classificacoes.js";

const faixa_etaria = document.getElementById('faixa_etaria')
const classificacao = document.getElementById('classificacao')
const caracteristica = document.getElementById('caracteristica')
const icone = document.getElementById('foto')
const iconeFile = document.getElementById('icone-dropzone-file')

let fotoClassificacao;

iconeFile.addEventListener("change", () => {
  let file = iconeFile.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const render = e.target;
      fotoClassificacao = render.result;
      icone.src = fotoClassificacao;
    });
    reader.readAsDataURL(file);
  }
});

let id = JSON.parse(localStorage.getItem("classificacao"));

async function exibirInformacoes() {
    let classificacoes = await getClassificacoes()

    for(let i = 0; i < classificacoes.length; i++){
        let classificacaoDB = classificacoes[i]

        if(classificacaoDB.id == id){
            faixa_etaria.value = classificacaoDB.faixa_etaria
            classificacao.value = classificacaoDB.classificacao
            caracteristica.value = classificacaoDB.caracteristica
            icone.src = classificacaoDB.icone
        }
    }

}

exibirInformacoes()