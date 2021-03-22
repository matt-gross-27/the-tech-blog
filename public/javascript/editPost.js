async function updatePostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector("#new-title").value.trim();
  const blog_text = document.querySelector("#blog-text").value;

  const id = document.location.pathname.split('/')[
    document.location.pathname.split('/').length -1
  ];

  if (title && blog_text) {
    const response = await fetch(`${window.location.origin}/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, blog_text }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      document.location.replace('/mypage');
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#update-post').addEventListener('submit', updatePostFormHandler)