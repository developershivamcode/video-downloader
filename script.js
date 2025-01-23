document.getElementById('downloadButton').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value.trim();

  // Instagram URL validation (basic check for 'instagram.com')
  const regex = /^https?:\/\/(www\.)?instagram\.com\/(?:p\/[A-Za-z0-9_-]+\/?)$/;

  if (!url) {
    alert("Please enter a valid Instagram URL!");
    return;
  }

  if (!regex.test(url)) {
    alert("Invalid Instagram URL! Please enter a valid post URL.");
    return;
  }

  // Proceed with API call if URL is valid
  fetch(https://your-backend-url.com/download?url=${encodeURIComponent(url)})
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
