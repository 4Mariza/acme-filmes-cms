import { postFilme } from "../filmes.js"
import { uploadImgur } from "../imgur.js";

const foto_capa = document.getElementById("capa-dropzone-file")
const foto_fundo = document.getElementById("bg-dropzone-file")

const titulo = document.getElementById("title")
const preco = document.getElementById("price")
const lancamento = document.getElementById("data_lancamento")
const img = document.getElementById("foto")
const duracao = document.getElementById("duration")
const sinopse = document.getElementById("sinopse")
const imgBackground = document.getElementById("foto-bg")
const relancamento = document.getElementById("data_relancamento")

const cadastrar = document.getElementById("cadastrar_filme")

let fileImg 
let fileImgBackground 

foto_capa.addEventListener("change", async () => {
    fileImg = foto_capa.files[0]

    let foto 
    let file = foto_capa.files[0]
    
    if (file) {
        const reader = new FileReader()

        reader.addEventListener("load", (e) => {
            const render = e.target
            const img = document.getElementById("foto")
            foto = render.result
            img.src = foto
        })
        reader.readAsDataURL(file)
    }
})

foto_fundo.addEventListener("change", async () => {
    fileImgBackground = foto_fundo.files[0]

    let foto
    let file = foto_fundo.files[0]

    if (file) {
        const reader = new FileReader()

        reader.addEventListener("load", (e) => {
            const render = e.target
            const img = document.getElementById("foto-bg")
            foto = render.result
            img.src = foto
        })
        reader.readAsDataURL(file)
    }
})


cadastrar.addEventListener('click', async () => {
    let filme = {}

   const urlImgBackground = await uploadImgur(fileImgBackground)

   const urlImg = await uploadImgur(fileImg)

    if (relancamento.value == "" || relancamento.value == null || relancamento.value == undefined) {
        filme = {
            nome : titulo.value,
            valor_unitario : preco.value,
            sinopse : sinopse.value,
            foto_capa : urlImg,
            foto_fundo : urlImgBackground,
            duracao : `${duracao.value}`,
            data_lancamento : lancamento.value,
            data_relancamento : null
        }
    } else {
        filme = {
            nome : titulo.value,
            valor_unitario : preco.value,
            sinopse : sinopse.value,
            foto_capa : urlImg,
            foto_fundo : urlImgBackground,
            duracao : duracao.value,
            data_lancamento : lancamento.value,
            data_relancamento : relancamento.value
        }
    }
   
    console.log(filme);
    await postFilme(filme)

})
