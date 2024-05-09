export async function getGeneros() {
    const url = 'http://localhost:8080/v1/acmeFilmes/generos'
    const response = await fetch(url)
    const data = await response.json()

    return data.generos
}

export async function getGeneroById(id){
    const url = `http://localhost:8080/v1/acmeFilmes/genero/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.genero
}

export async function inserirGenero(genero){
    const url = 'http://localhost:8080/v1/acmeFilmes/generos'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genero)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function deleteGenero(id){
    const url = `http://localhost:8080/v1/acmeFilmes/genero/${id}`
    const options = {
        method: 'DELETE',
    }
    const response = fetch(url, options)

    return response.ok
}

