import { inserirClassificação } from "../../classificacoes.js";
import { uploadImgur } from "../../imgur.js";

const cadastrar = document.getElementById("cadastrar_classificacao");
const faixa_etaria = document.getElementById("faixa_etaria");
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

cadastrar.addEventListener('click', async ()=> {
    let novaClassificacao = {}
    let urlImg = classificacao.icone;

  if (iconeFile.files.length > 0) {
    urlImg = await uploadImgur(iconeFile.files[0]);
  }

  let fotoClassificacao;
  icone.addEventListener("change", () => {
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


    novaClassificacao = {
        faixa_etaria: faixa_etaria.value,
        classificacao: classificacao.value,
        caracteristica: caracteristica.value,
        icone: urlImg
    }

    let isPosted = await inserirClassificação(novaClassificacao)

    if (isPosted) {
       localStorage.clear()
       alert("Classificação cadastrada com sucesso!");
    }
})