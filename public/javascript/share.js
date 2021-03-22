const $shareButtons = document.querySelectorAll('.oi-shareDiv');

shareButtonHandler = (event) => {
  event.preventDefault();

  let id;
  let shareText;

  if (event.target.localName === "span") {
    id = event.target.parentElement.getAttribute("data-post_id");
    shareText = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('.accordion-button').textContent;
  } else {
    id = event.target.getAttribute("data-post_id");
    shareText = event.target.parentElement.parentElement.parentElement.parentElement.querySelector('.accordion-button').textContent;
  }

  if(navigator.share !== undefined) {
    navigator.share({
        title: `The Tech Blog`, 
        text: `The Tech Blog: ${shareText.trim()}
        `, 
        url: `${window.location.origin}/posts/${id}`
    })
      .then(() => console.log('Successful share'))
      .catch(err => console.log('Error sharing:', err));
  }
}


$shareButtons.forEach(shareButton => shareButton.addEventListener('click', shareButtonHandler));