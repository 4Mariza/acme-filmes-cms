import { atualizarDiretor, getDiretorById} from "../../diretores.js";
import {uploadImgur} from "../../imgur.js"

const editarBtn = document.getElementById('editar_diretor')

let id = JSON.parse(localStorage.getItem("diretor"));

editarBtn.addEventListener('click', async ()=> {
    
    const img = document.getElementById("foto");
    const foto = document.getElementById('foto-dropzone-file')
    const nome = document.getElementById('nome')
    const sexoFeminino = document.getElementById('feminino')

    let diretor = await getDiretorById(id);

    let urlImg = diretor.foto;

  if (foto.files.length > 0) {
    urlImg = await uploadImgur(foto.files[0]);
  }

  let fotoDiretor;
  foto.addEventListener("change", () => {

    let file = foto.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const render = e.target;
        fotoDiretor = render.result;
        img.src = fotoDiretor;
      });
      reader.readAsDataURL(file);
    }
  });

  const nomeAlterado = nome.value
  const fotoAlterada = urlImg
  const sexoAlterado = sexoFeminino.checked == true ? 1 : 2

  let nacionalidades = JSON.parse(localStorage.getItem('nacionalidades'))

  let arrayNacionalidades = []
  nacionalidades.forEach(element => {
    arrayNacionalidades.push(Number(element))
  });
  
  const diretorAlterado = {
    id: id,
    nome : nomeAlterado, 
    foto: fotoAlterada,
    id_sexo: sexoAlterado,
    nacionalidade: arrayNacionalidades
  }

  let isEdited = await atualizarDiretor(diretorAlterado);

  if (isEdited) {
    localStorage.clear()
    alert("Diretor editado com sucesso!");
  }
})