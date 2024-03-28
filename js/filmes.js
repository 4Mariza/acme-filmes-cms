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

    return data.filme[0]
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
    const response = fetch(url, options)

    return response.ok
}

export async function putFilme(filme){
    const url = `http://localhost:8080/v2/acmeFilmes/editeFilme/${filme.id}`
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filme)
    }
    const response = fetch(url, options)

    return response.ok
}

export async function deleteFilme(id){
    const url = `http://localhost:8080/v2/acmeFilmes/deleteFilme/${id}`
    const options = {
        method: 'DELETE',
    }
    const response = fetch(url, options)

    return response.ok
}

export async function getFilmebyTitle(title){
    const url = `http://localhost:8080/v1/acmeFilmes/filmes/filtro/${title}`
    const response = await fetch(url)
    console.log('askjaksjajdjljdlkfjslkdjfljflkjskldfjkldsfjlkdsjfsdjflçjdçfasdjçflfjd');
    const data = await response.json()
    console.log(data.filme[0]);
    return data.filme[0]
}