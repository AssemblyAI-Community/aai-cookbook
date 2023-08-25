const init = () => {
//Get the cues from the Backend
  const isLocal = window.location.hostname === "localhost"
  const url = isLocal ? "http://localhost:8000/vtt" : "https://captions-demo-backend.fly.dev/vtt"
  fetch(url)
    .then(response => response.json())
    .then(data => {
      //Remove header element from the array, so that the array only has cue data 
      const cues = data.slice(1);

      //Change timestamp format from milleseconds to seconds
      const captions = cues.map(cue => {
        return {
          ...cue.data,
          start: cue.data.start/1000,
          end: cue.data.end/1000  
        }
      })

      //Add text track and VTT cues to the video to show captions on the video
      let video = document.querySelector("video");
      let track = video.addTextTrack("captions", "Captions", "en");
      track.mode = "showing";
      captions.map(caption => track.addCue(new VTTCue(caption.start, caption.end, caption.text)))
    });
}

init();


