const email = document.getElementById('email');
const password = document.getElementById('password');

const loginButton = document.getElementById('login')

const verifyUser = async () => {
  console.log('oi');
  const response = await fetch('http://localhost:8080/v1/acmeFilmes/usuarioscms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    }),
  })

  const data = await response.json() 
  console.log(data)
}

loginButton.addEventListener('click', verifyUser)