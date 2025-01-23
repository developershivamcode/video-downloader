document.getElementById('downloadButton').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value.trim();
  
  if (!url) {
    alert("Please enter a valid Instagram URL!");
    return;
  }

  fetch(`https://your-backend-url.com/download?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const videoElement = document.createElement('video');
        videoElement.src = data.downloadLink;
        videoElement.controls = true;
        document.getElementById('output').innerHTML = "";
        document.getElementById('output').appendChild(videoElement);
      } else {
        document.getElementById('output').innerHTML = "<p>Failed to fetch video. Please check the URL.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('output').innerHTML = "<p>Error fetching video. Please try again later.</p>";
    });
});
