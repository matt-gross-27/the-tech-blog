const $likeButtons = document.querySelectorAll('.oi-likeDiv');

async function likeButtonHandler(event) {
  event.preventDefault();

  let id = 0

  if (event.target.localName === "span") {
    id = event.target.parentElement.getAttribute("data-post_id");
  } else {
    id = event.target.getAttribute("data-post_id");
  }

  console.log(id);

  const response = await fetch('api/posts/like', {
    method: 'PUT',
    body: JSON.stringify({ post_id: id }),
    headers: { 'Content-Type': "application/json" }
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

$likeButtons.forEach(likeButton => likeButton.addEventListener('click', likeButtonHandler));