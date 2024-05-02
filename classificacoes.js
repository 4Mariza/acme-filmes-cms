export async function getClassificacaoPorFaixaEtaria(faixaEtaria) {
    const url = `http://localhost:8080/v1/acmeFilmes/classificacao/${faixaEtaria}`
    const response = await fetch(url)
    const data = await response.json()

    return data
}