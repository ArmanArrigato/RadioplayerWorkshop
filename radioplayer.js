// Steg 1. Gör en fetch till 'https://api.sr.se/api/v2/channels/?format=json'

// Steg 2. loopa med tex forEach över data.channels - ta ut data och visa på html-sidan.

// Steg 3. ta ut liveaudio.url från varje kanal och lägg i en audio tagg.
// <audio controls>
//   <source src="" type="audio/mpeg" />
// </audio>

//container 
const channelsContainer = document.getElementById('channels');


function fetchChannels() {
  fetch('http://api.sr.se/api/v2/channels?format=json&size=100')
    .then(response => response.json())
    .then(data => {
      
      data.channels.forEach(channel => {
       
        if (channel.liveaudio && channel.liveaudio.url) {
          
          const channelDiv = document.createElement('div');
          channelDiv.className = 'channel';
          
          channelDiv.style.backgroundColor = '#' + channel.color;

          
          const channelImg = document.createElement('img');
          channelImg.src = channel.image;
          channelImg.alt = channel.name;

         
          const channelTitle = document.createElement('h2');
          channelTitle.innerText = channel.name;

          
          const channelAudio = document.createElement('audio');
          channelAudio.controls = true;
          const audioSource = document.createElement('source');
          audioSource.src = channel.liveaudio.url;
          audioSource.type = 'audio/mpeg';
          channelAudio.appendChild(audioSource);

         
          channelDiv.appendChild(channelImg);
          channelDiv.appendChild(channelTitle);
          channelDiv.appendChild(channelAudio);

         
          channelsContainer.appendChild(channelDiv);
        }
      });
    })
    .catch(error => {
      console.error('Error fetching channels:', error);
    });
}


fetchChannels();
