const $shareButtons = document.querySelectorAll('.oi-shareDiv');

shareButtonHandler = (event) => {
  event.preventDefault();

  let eTarget;

  if (event.target.localName === "span") {
    eTarget = event.target.parentElement;
  } else {
    eTarget = event.target;
  }

  const id = eTarget.getAttribute("data-post_id")

  let shareText = document.querySelector(`#blog-post-${id}`).textContent

  navigator.share({
      title: `The Tech Blog`, 
      text: `The Tech Blog: ${shareText.trim()}`, 
      url: `${window.location.origin}/posts/${id}`
  })
    .then(() => console.log('Successful share'))
    .catch(err => console.log('Error sharing:', err));
}

function showHideShareButtons () {
  if (navigator.share !== undefined) {
    $shareButtons.forEach(shareButton => shareButton.addEventListener('click', shareButtonHandler));
  } else {
    $shareButtons.forEach(shareButton => shareButton.remove());
  }
}

showHideShareButtons();