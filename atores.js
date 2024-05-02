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

    return data
}