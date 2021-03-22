async function createCommentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#comment-text").value.trim();
  const post_id = document.location.pathname.split('/')[
    document.location.pathname.split('/').length -1
  ];
  
  if (comment_text) {
    const response = await fetch(`${window.location.origin}/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment_text, post_id }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#create-comment').addEventListener('submit', createCommentFormHandler);