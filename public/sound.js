
/* <audio id="audio-birds" loop autoplay muted>
<source src="audio/birds by the water.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio>
<audio id="audio-night" loop autoplay muted>
<source src="audio/night.mp3" type="audio/mpeg">
Your browser does not support the audio element.
</audio> */

var debugSound = document.getElementById("debug-sound");

var audioBirds = document.getElementById("audio-birds");
var audioNight = document.getElementById("audio-night");

var audioBirdsTargetVol = 0;
var audioNightTargetVol = 0;

var audioDt = 100;

// this must be called after the first interaction with the document.
// could be in the main menu.
function PlayAudio(initBirdsVol = 0, initNightVol = 0) {
    audioBirds.play();
    audioNight.play();
    audioBirds.volume = initBirdsVol;
    audioNight.volume = initNightVol;
}

function SetVolume(totalVolume, night01) {
    audioBirdsTargetVol = totalVolume * (1 - night01);
    audioNightTargetVol = totalVolume * (night01);
}

setInterval(() => {
    audioBirds.volume = lerp(audioBirds.volume, audioBirdsTargetVol, 0.02);
    audioNight.volume = lerp(audioNight.volume, audioNightTargetVol, 0.02);
    debugSound.innerHTML = "audioBirds.volume: " + audioBirds.volume.toFixed(2) + "\taudioNight.volume: " + audioNight.volume.toFixed(2);
}, audioDt);