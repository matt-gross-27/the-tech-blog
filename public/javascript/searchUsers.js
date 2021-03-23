const $searchForm = document.querySelector("#search-form");
const $usersDatalist = document.querySelector("#users");
let userData;

async function getUsers() {
  const response = await fetch(`${window.location.origin}/api/users`, {
    method: 'GET',
  });

  userData = await response.json();

  userData.forEach(user => {
    const optionEl = document.createElement('option');
    optionEl.value = user.username;
    $usersDatalist.appendChild(optionEl)
  });
}

searchFormHandler = (event) => {
  event.preventDefault();

  const username = document.querySelector("#search-username").value;
  if (userData.includes(username)) {
    document.location.replace(`/${username}`);
  } else {
    document.querySelector("#search-username").value = null
    document.querySelector("#search-username").setAttribute("placeholder", "User not found");
  }
}

getUsers();
$searchForm.addEventListener('submit', searchFormHandler)