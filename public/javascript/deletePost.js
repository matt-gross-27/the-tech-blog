const $deleteButtons = document.querySelectorAll('.oi-trashDiv');

async function deleteButtonHandler(event) {
  event.preventDefault();

  console.log('pressed')

  let id = 0

  if (event.target.localName === "span") {
    id = event.target.parentElement.getAttribute("data-post_id");
  } else {
    id = event.target.getAttribute("data-post_id");
  }

  console.log(id);

  const response = await fetch(`${window.location.origin}/api//posts/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': "application/json" }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

$deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteButtonHandler));