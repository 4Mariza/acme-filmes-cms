export async function getDiretores() {
    const url = `http://localhost:8080/v1/acmeFilmes/diretores`
    const response = await fetch(url)
    const data = await response.json()

    return data.diretores
}

export async function filmeDiretores(idFilme){
    const url = `http://localhost:8080/v1/acmeFilmes/filmeDiretor/${idFilme}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data
}

export async function getDiretorById(id){
    const url = `http://localhost:8080/v1/acmeFilmes/diretor/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.diretor[0]
}

export async function atualizarDiretor(dadosDiretor){
    const url = `http://localhost:8080/v1/acmeFilmes/diretor/${dadosDiretor.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosDiretor)
    }
    const response = await fetch(url, options)
    return response.ok
    
}

export async function inserirDiretor(diretor){
    const url = 'http://localhost:8080/v1/acmeFilmes/diretores'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(diretor)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function deleteDiretor(id){
    const url = `http://localhost:8080/v1/acmeFilmes/diretor/${id}`
    const options = {
        method: 'DELETE',
    }
    const response = fetch(url, options)

    return response.ok
}
