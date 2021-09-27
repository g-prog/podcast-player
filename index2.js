const hamburger = document.querySelector(".mobile-hamburger");
const navMenu = document.querySelector(".other-links");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}



const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');



let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
isMusicPaused = true;

window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  playingSong(); 
});

function loadMusic(indexNumb){
  title.innerText = allMusic[indexNumb - 1].name;
  artist.innerText = allMusic[indexNumb - 1].artist;
  cover.src = `images/${allMusic[indexNumb - 1].src}.jpg`;
  audio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
}


// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}


// Previous song
function prevMusic(){
	musicIndex--; //decrement of musicIndex by 1
	//if musicIndex is less than 1 then musicIndex will be the array length so the last music play
	musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
	loadMusic(musicIndex);
	playSong();
	playingSong(); 
}

//next music function
function nextMusic(){
  musicIndex++; //increment of musicIndex by 1
  //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
  musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
  loadMusic(musicIndex);
  playSong();
  playingSong(); 
}

//prev music button event
prevBtn.addEventListener("click", ()=>{
  prevMusic();
});

//next music button event
nextBtn.addEventListener("click", ()=>{
  nextMusic();
});




// update progress bar width according to music current time
audio.addEventListener("timeupdate", (e)=>{
	const currentTime = e.target.currentTime; //getting playing song currentTime
	const duration = e.target.duration; //getting playing song total duration
	let progressWidth = (currentTime / duration) * 100;
	progress.style.width = `${progressWidth}%`;
  
	let musicCurrentTime = document.querySelector("#currTime"),
	musicDuartion = document.querySelector("#durTime");
	audio.addEventListener("loadeddata", ()=>{
	  // update song total duration
	  let mainAdDuration = audio.duration;
	  let totalMin = Math.floor(mainAdDuration / 60);
	  let totalSec = Math.floor(mainAdDuration % 60);
	  if(totalSec < 10){ //if sec is less than 10 then add 0 before it
		totalSec = `0${totalSec}`;
	  }
	  musicDuartion.innerText = `${totalMin}:${totalSec}`;
	});
	// update playing song current time
	let currentMin = Math.floor(currentTime / 60);
	let currentSec = Math.floor(currentTime % 60);
	if(currentSec < 10){ //if sec is less than 10 then add 0 before it
	  currentSec = `0${currentSec}`;
	}
	musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  });
  
  // update playing song currentTime on according to the progress bar width
  progressContainer.addEventListener("click", (e)=>{
	let progressWidth = progressContainer.clientWidth; //getting width of progress bar
	let clickedOffsetX = e.offsetX; //getting offset x value
	let songDuration = audio.duration; //getting song total duration
	
	audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
	playSong(); //calling playMusic function
	playingSong();
  });
  




// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
