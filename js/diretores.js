export async function getDiretores() {
    const url = `http://localhost:8080/v1/acmeFilmes/diretores`
    const response = await fetch(url)
    const data = await response.json()

    return data
}

export async function filmeDiretores(idFilme){
    const url = `http://localhost:8080/v1/acmeFilmes/filmeDiretor/${idFilme}`
    const response = await fetch(url)
    const data = await response.json()
    
    return data
}


