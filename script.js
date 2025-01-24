document.getElementById('downloadButton').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value.trim();

  // Updated Regex
  const regex = /^https?:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[A-Za-z0-9_-]+\/?$/;

  console.log("Entered URL:", url); // Debugging log

  if (!url) {
    alert("Please enter a valid Instagram URL!");
    return;
  }

  if (!regex.test(url)) {
    console.log("Invalid URL entered:", url); // Debugging log
    alert("Invalid Instagram URL! Please enter a valid post URL.");
    return;
  }

  console.log("URL is valid. Proceeding with API call...");

  // Proceed with API call
  fetch(`https://your-backend-url.com/download?url=${encodeURIComponent(url)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("API Response:", data); // Debugging log

      if (data.success) {
        const videoElement = document.createElement('video');
        videoElement.src = data.downloadLink;
        videoElement.controls = true;
        document.getElementById('output').innerHTML = "";
        document.getElementById('output').appendChild(videoElement);

        const downloadLink = document.createElement('a');
        downloadLink.href = data.downloadLink;
        downloadLink.download = "downloaded_video";
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      } else {
        document.getElementById('output').innerHTML = "<p>Failed to fetch video. Please check the URL.</p>";
      }
    })
    .catch(err => {
      console.error("Error occurred:", err);
      document.getElementById('output').innerHTML = "<p>Error fetching video. Please try again later.</p>";
    });
});
