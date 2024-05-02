export async function getUsuarios() {
    const url = `http://localhost:8080/v1/acmeFilmes/usuarioscms`
    const response = await fetch(url)
    const data = await response.json()

    return data
}