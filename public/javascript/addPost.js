async function createPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#new-title").value.trim();
  const blog_text = document.querySelector("#blog-text").value;

  if (title && blog_text) {
    const response = await fetch(`${window.location.origin}/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, blog_text }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#create-post').addEventListener('submit', createPostFormHandler)