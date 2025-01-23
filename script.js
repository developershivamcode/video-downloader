document.getElementById('downloadButton').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value.trim();

  // Instagram Video URL validation (checks for posts with videos)
  const regex = /^https?:\/\/(www\.)?instagram\.com\/p\/[A-Za-z0-9_-]+\/?$/;

  if (!url) {
    alert("Please enter a valid Instagram URL!");
    return;
  }

  if (!regex.test(url)) {
    alert("Invalid Instagram URL! Please enter a valid post URL.");
    return;
  }

  // Proceed with API call if URL is valid
  fetch(`https://your-backend-url.com/download?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const videoElement = document.createElement('video');
        videoElement.src = data.downloadLink;
        videoElement.controls = true;
        document.getElementById('output').innerHTML = "";
        document.getElementById('output').appendChild(videoElement);
        
        // Create a download link and trigger it automatically
        const downloadLink = document.createElement('a');
        downloadLink.href = data.downloadLink;
        downloadLink.download = "downloaded_video";
        downloadLink.style.display = 'none'; // Hide the link
        document.body.appendChild(downloadLink); // Append the link to body
        downloadLink.click(); // Automatically click the link to start downloading
        document.body.removeChild(downloadLink); // Remove the link after download starts
      } else {
        document.getElementById('output').innerHTML = "<p>Failed to fetch video. Please check the URL.</p>";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById('output').innerHTML = "<p>Error fetching video. Please try again later.</p>";
    });
});
