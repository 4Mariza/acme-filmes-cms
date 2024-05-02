import { getUsuarios } from "../usuarioAdmin.js";

const email = document.getElementById('email');
const password = document.getElementById('password');

const loginButton = document.getElementById('login')

const verifyUser = async () => {
  console.log('oi');

  let usuarios = await getUsuarios()

  usuarios.usuarios.forEach(user => {
    if(email.value == user.login && password.value == user.senha){
  
      alert('Usuário logado com sucesso!')

      localStorage.setItem('user', JSON.stringify(user.nome))

      window.location.href='../html/index.html'
    }
  });


}

loginButton.addEventListener('click', verifyUser)