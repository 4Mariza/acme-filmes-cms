import { atualizarAtor, getAtorById} from "../../atores.js";
import {uploadImgur} from "../../imgur.js"

const editarBtn = document.getElementById('editar_ator')

let id = JSON.parse(localStorage.getItem("ator"));

editarBtn.addEventListener('click', async ()=> {
    
    const img = document.getElementById("foto");
    const foto = document.getElementById('foto-dropzone-file')
    const nome = document.getElementById('nome')
    const nome_artistico = document.getElementById('nome_artistico')
    const sexoFeminino = document.getElementById('feminino')

    let ator = await getAtorById(id);

    let urlImg = ator.foto;

  if (foto.files.length > 0) {
    urlImg = await uploadImgur(foto.files[0]);
  }

  let fotoAtor;
  foto.addEventListener("change", () => {

    let file = foto.files[0];

    if (file) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        const render = e.target;
        fotoAtor = render.result;
        img.src = fotoAtor;
      });
      reader.readAsDataURL(file);
    }
  });

  const nomeAlterado = nome.value
  const fotoAlterada = urlImg
  const nomeArtisticoAlterado = nome_artistico.value == null ? null : nome_artistico.value
  const sexoAlterado = sexoFeminino.checked == true ? 1 : 2

  let nacionalidades = JSON.parse(localStorage.getItem('nacionalidades'))

  let arrayNacionalidades = []
  nacionalidades.forEach(element => {
    arrayNacionalidades.push(Number(element))
  });
  
  const atorAlterado = {
    id: id,
    nome : nomeAlterado, 
    foto: fotoAlterada,
    id_sexo: sexoAlterado,
    nome_artistico : nomeArtisticoAlterado,
    nacionalidade: arrayNacionalidades
  }

  let isEdited = await atualizarAtor(atorAlterado);

  if (isEdited) {
    localStorage.clear()
    alert("Ator editado com sucesso!");
  }
})