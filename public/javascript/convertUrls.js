const $pEls = document.querySelectorAll("p");
const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const regexUrl = new RegExp(expression);


const convertUrls = () => {

  $pEls.forEach(p => {
    let text = p.textContent
    const urls = text.match(regexUrl);
    console.log(urls);
    let newText = "";
    if (urls) {
      let newText = text.replace(urls[0], `<a target="blank_" href="${urls[0]}">${urls[0]}</a>`);
      p.innerHTML = newText
    }
  });
}

convertUrls();