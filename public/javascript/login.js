const $loginForm = document.querySelector('#login-form');
const $signupForm = document.querySelector('#signup-form');
const $displayLoginBtn = document.querySelector('#display-login');
const $displaySignupBtn = document.querySelector('#display-signup');

function displayLoginBtnHandler(event) {
  event.preventDefault();
  
  $loginForm.classList.remove('d-none');
  $displayLoginBtn.classList.add('d-none');
  $displaySignupBtn.classList.add('d-none');

  $loginForm.querySelector('#login-email').focus();
}

function displaySignupBtnHandler(event) {
  event.preventDefault();

  $signupForm.classList.remove('d-none');
  $displayLoginBtn.classList.add('d-none');
  $displaySignupBtn.classList.add('d-none');

  $signupForm.querySelector('#signup-username').focus();
}

async function loginFormHandler(event) {
  event.preventDefault();

  const email    = $loginForm.querySelector('#login-email').value.trim();
  const password = $loginForm.querySelector('#login-password').value.trim();

  if (email && password) {
    const response = await fetch(`${window.location.origin}/api/users/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(`incorrect username or password`)
    }
  }
}

async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value.trim();
  const email    = document.querySelector('#signup-email').value.trim();
  const password = document.querySelector('#signup-password').value.trim();

  if (username && email && password.length >= 8) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  } else {
    document.querySelector('#signup-password').value = null
    document.querySelector('#signup-password').setAttribute("placeholder", "Password Must Be >= 8 Characters");
  }
}

$signupForm.addEventListener('submit', signupFormHandler);
$loginForm.addEventListener('submit', loginFormHandler);

$displayLoginBtn.addEventListener('click', displayLoginBtnHandler);
$displaySignupBtn.addEventListener('click', displaySignupBtnHandler);