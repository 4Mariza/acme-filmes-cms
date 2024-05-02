export async function getFilmes() {
    const url = 'http://localhost:8080/v2/acmeFilmes/filmes'
    const response = await fetch(url)
    const data = await response.json()

    return data.filmes
}

export async function getFilme(id){
    const url = `http://localhost:8080/v2/acmeFilmes/filme/${id}`
    const response = await fetch(url)
    const data = await response.json()

    return data.filme
}

export async function postFilme(filme){
    const url = 'http://localhost:8080/v2/acmeFilmes/filme'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filme)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function putFilme(filme){
   console.log(filme);
    const url = `http://localhost:8080/v2/acmeFilmes/filme/${filme.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filme)
    }
    const response = await fetch(url, options)
console.log(response);
    return response.ok
}

export async function deleteFilme(id){
    const url = `http://localhost:8080/v2/acmeFilmes/filme/${id}`
    const options = {
        method: 'DELETE',
    }
    const response = fetch(url, options)

    return response.ok
}

export async function getFilmebyTitle(title){
    const url = `http://localhost:8080/v1/acmeFilmes/filmes/${title}`
    const response = await fetch(url)
    const data = await response.json()
   
    return data.filme
}