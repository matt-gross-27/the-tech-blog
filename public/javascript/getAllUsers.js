$usersDatalist = document.querySelector("#users");

async function getUsers() {
  const response = await fetch(`${window.location.origin}/api/users`, {
    method: 'GET',
  });

  const userData = await response.json();

  userData.forEach(user => {
    const optionEl = document.createElement('option');
    optionEl.value = user.username;
    $usersDatalist.appendChild(optionEl)
  });
}

getUsers();