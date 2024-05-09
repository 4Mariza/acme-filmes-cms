export async function getClassificacoes() {
    const url = `http://localhost:8080/v1/acmeFilmes/classificacoes`
    const response = await fetch(url)
    const data = await response.json()

    return data.classificacoes
}

export async function inserirClassificação(classificacao){
    const url = 'http://localhost:8080/v1/acmeFilmes/classificacoes'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(classificacao)
    }
    const response = await fetch(url, options)

    return response.ok
}

export async function deletarClassificacao(id){
    const url = `http://localhost:8080/v1/acmeFilmes/classificacoes/${id}`
    const options = {
        method: 'DELETE',
    }
    const response = fetch(url, options)

    return response.ok
}