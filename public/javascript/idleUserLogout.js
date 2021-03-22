let timer;

async function logout() {
  const response = await fetch(`${window.location.origin}/api/users/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(logout, 1800000);
}


function startTimer() {
  timer = setTimeout(logout, 1800000);
}

startTimer();

document.addEventListener('click', resetTimer);
document.addEventListener('scroll', resetTimer);

// log out after 30 minutes of not clicking or scrolling