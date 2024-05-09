import { getUsuarios } from "../usuarioAdmin.js";

const email = document.getElementById('email');
const password = document.getElementById('password');

const loginButton = document.getElementById('login')

const verifyUser = async () => {

  let usuarios = await getUsuarios()

  usuarios.usuarios.forEach(user => {
    if(email.value == user.login && password.value == user.senha){
  
      alert('Usuário logado com sucesso!')

      window.location.href='../html/index.html'
    }
  });


}

loginButton.addEventListener('click', verifyUser)