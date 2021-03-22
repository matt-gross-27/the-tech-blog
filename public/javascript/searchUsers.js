const $searchForm = document.querySelector("#search-form");

searchFormHandler = (event) => {
  event.preventDefault();

  const username = document.querySelector("#search-username").value;
  if (username) {
    document.location.replace(`/${username}`);
  }
}

$searchForm.addEventListener('submit', searchFormHandler)