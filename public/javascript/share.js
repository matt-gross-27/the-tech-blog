const $shareButtons = document.querySelectorAll('.oi-shareDiv');

shareButtonHandler = (event) => {
  event.preventDefault();

  let id;

  if (event.target.localName === "span") {
    id = event.target.parentElement.getAttribute("data-post_id");
  } else {
    id = event.target.getAttribute("data-post_id");
  }

  let shareText = document.querySelector(`#blog-post-${id}`).textContent

  if(navigator.share !== undefined) {
    navigator.share({
        title: `The Tech Blog`, 
        text: `The Tech Blog: ${shareText.trim()}
        `, 
        url: `${window.location.origin}/posts/${id}`
    })
      .then(() => console.log('Successful share'))
      .catch(err => console.log('Error sharing:', err));
  } else {
    alert(`Sorry. This feature is not compatible with your browser :(`)
  }
}


$shareButtons.forEach(shareButton => shareButton.addEventListener('click', shareButtonHandler));