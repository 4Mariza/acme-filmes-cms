export function showMoreInfo(filme){
    console.log(filme);
    
    const titulo = document.getElementById('title')
    const preco = document.getElementById('price')
    const data_lancamento = document.getElementById('data_lancamento')
    const data_relancamento  = document.getElementById('data_relancamento')
    const id = document.getElementById('id')
    const duracao = document.getElementById('duration')
    const sinopse = document.getElementById('sinopse')
    const foto_capa = document.getElementById('capa-dropzone-file')
    const foto_fundo = document.getElementById('bg-dropzone-file')

    titulo.value = filme.nome
    preco.value = filme.valor_unitario
    sinopse.textContent = filme.sinopse
}
console.log(JSON.parse(localStorage.getItem('filme')));