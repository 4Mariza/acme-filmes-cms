export async function getGeneros() {
    const url = 'http://localhost:8080/v1/acmeFilmes/generos'
    const response = await fetch(url)
    const data = await response.json()

    return data.generos
}

