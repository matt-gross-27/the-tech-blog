const $likeButtons = document.querySelectorAll('.oi-likeDiv');

async function likeButtonHandler(event) {
  event.preventDefault();

  let id;
  let iLike;

  if (event.target.localName === "span") {
    id = event.target.parentElement.getAttribute("data-post_id");
    iLike = event.target.parentElement.getAttribute("data-i_like");
  } else {
    id = event.target.getAttribute("data-post_id");
    iLike = event.target.getAttribute("data-i_like");
  }

  // Like a post
  if (iLike === "0") {
    let response = await fetch(`${window.location.origin}/api/posts/like`, {
      method: 'PUT',
      body: JSON.stringify({ post_id: id }),
      headers: { 'Content-Type': "application/json" }
    });
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  } else if (iLike === "1") {
    // unLike a post
    let response = await fetch(`${window.location.origin}/api/posts/unlike`, {
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
}

$likeButtons.forEach(likeButton => likeButton.addEventListener('click', likeButtonHandler));