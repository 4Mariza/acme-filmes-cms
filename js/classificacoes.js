export async function getClassificacoes() {
    const url = `http://localhost:8080/v1/acmeFilmes/classificacoes`
    const response = await fetch(url)
    const data = await response.json()

    return data
}