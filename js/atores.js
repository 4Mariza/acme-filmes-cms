export async function filmeAtor(idFilme) {
    const url = `http://localhost:8080/v1/acmeFilmes/filmeAtor/${idFilme}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function getAtores() {
    const url = `http://localhost:8080/v1/acmeFilmes/atores`
    const response = await fetch(url)
    const data = await response.json()

    return data.atores
}

export async function getAtorById(id){
    const url = `http://localhost:8080/v1/acmeFilmes/ator/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.ator[0]
}

export async function atualizarAtor(dadosAtor){
    const url = `http://localhost:8080/v1/acmeFilmes/ator/${dadosAtor.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtor)
    }
    const response = await fetch(url, options)
    return response.ok
    
}

export async function inserirAtor(ator){
    const url = 'http://localhost:8080/v1/acmeFilmes/atores'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ator)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function getSexobyId(id){
    console.log(id);
    const url = `http://localhost:8080/v1/acmeFilmes/sexo/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function getSexos(){
    const url = `http://localhost:8080/v1/acmeFilmes/sexo`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function getNacionalidades(){
    const url = `http://localhost:8080/v1/acmeFilmes/nacionalidades`
    const response = await fetch(url)
    const data = await response.json()

    return data.nacionalidades
}

export async function deleteAtor(id){
    const url = `http://localhost:8080/v1/acmeFilmes/ator/${id}`
    const options = {
        method: 'DELETE',
    }
    const response = fetch(url, options)

    return response.ok
}

