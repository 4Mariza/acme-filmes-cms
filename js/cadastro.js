const nome = document.getElementById('nome')
const email = document.getElementById('email');
const password = document.getElementById('password');

const cadastroButton = document.getElementById('cadastrar')

async function cadastrarUsuario() {
    const usuarioNovo = {
        nome: nome.value,
        login:email.value,
        senha: password.value
    }

    const url = 'http://localhost:8080/v1/acmeFilmes/usuarioscms'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioNovo)
    }
    const response = await fetch(url, options)

    if (response) {
        alert('Usuário cadastrado com sucesso')
        
        window.location.href="../html/login.html"
    }
    return response.ok
} 

cadastroButton.addEventListener('click', cadastrarUsuario)