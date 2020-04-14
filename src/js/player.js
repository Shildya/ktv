video = document.querySelector('.movie-video');

playBtn = document.querySelector('.play-button');

pauseBtn = document.querySelector('.pause-button');

restartBtn = document.querySelector('.restart-button');

controls = document.querySelector('.controls');

fullscreenBtn = document.querySelector('.fullscreen-button');

volumeBar = document.querySelector('.volume-bar');

playBtn.addEventListener('click', () => {
    video.play();
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    barPlayBtn.classList.add('hidden');
    barPauseBtn.classList.remove('hidden');
});

pauseBtn.addEventListener('click', () => {
    video.pause();
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    barPlayBtn.classList.remove('hidden');
    barPauseBtn.classList.add('hidden');
});

video.addEventListener('ended', () => {
    restartBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    barRestartBtn.classList.remove('hidden');
    barPauseBtn.classList.add('hidden');
});

restartBtn.addEventListener('click', () => {
    restartBtn.classList.add('hidden');
    barRestartBtn.classList.add('hidden');
    video.currentTime = 0;
    video.play();
    pauseBtn.classList.remove('hidden');
    barPauseBtn.classList.remove('hidden')
});

// video.addEventListener('click', () => {
//     if (video.ended) {
//         restartBtn.classList.add('hidden');
//         video.currentTime = 0;
//         video.play();
//         pauseBtn.classList.remove('hidden')
//     }
//     else if (!video.paused) {
//         video.pause();
//         playBtn.classList.remove('hidden');
//         pauseBtn.classList.add('hidden');
//     }
//     else {
//         video.play();
//         playBtn.classList.add('hidden');
//         pauseBtn.classList.remove('hidden');
//     }
// });

fullscreenBtn.addEventListener('click', toggleFullScreen, false)

function toggleFullScreen(){
	if(video.requestFullScreen){
        video.requestFullScreen();
	} else if(video.webkitRequestFullScreen){
        video.webkitRequestFullScreen();
	} else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();

	}
}

volumeBar.addEventListener('input', () => {
    video.volume = volumeBar.value;
});

progressBar = document.querySelector('.progress-bar');

progressBar.addEventListener("click", seek);

function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    video.currentTime = percent * video.duration;
    e.target.value = Math.floor(percent / 100);
    e.target.innerHTML = progressBar.value + '% played';
}

function updateProgressBar() {
    // Work out how much of the media has played via the duration and currentTime parameters
    var percentage = Math.floor((100 / video.duration) * video.currentTime);
    // Update the progress bar's value
    progressBar.value = percentage;
    // Update the progress bar's text (for browsers that don't support the progress element)
    progressBar.innerHTML = percentage + '% played';
}

video.addEventListener('timeupdate', updateProgressBar, false);

videoTime = document.querySelector('.video-time');

video.addEventListener('timeupdate', () => {
    if (Math.floor(video.currentTime) >= 10) {
        videoTime.innerHTML = '0:' + Math.floor(video.currentTime) + ' / 0:' + Math.floor(video.duration);
    }
    else {
        videoTime.innerHTML = '0:0' + Math.floor(video.currentTime) + ' / 0:' + Math.floor(video.duration);
    }
    
}, false);

var lastVolume = volumeBar.value;

volumeMute = document.querySelector('.mute');
volumeUnmute = document.querySelector('.unmute');

volumeMute.addEventListener('click', () => {
    volumeMute.classList.toggle('hidden');
    volumeUnmute.classList.toggle('hidden');
    video.volume = lastVolume;
    volumeBar.value = lastVolume;
});

volumeUnmute.addEventListener('click', () => {
    volumeMute.classList.toggle('hidden');
    volumeUnmute.classList.toggle('hidden');
    lastVolume = volumeBar.value;
    video.volume = 0;
    volumeBar.value = 0;
});

barPlayBtn = document.querySelector('.play');
barPauseBtn = document.querySelector('.pause');
barRestartBtn = document.querySelector('.restart');

barPlayBtn.addEventListener('click', () => {
    video.play();
    playBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    barPlayBtn.classList.add('hidden');
    barPauseBtn.classList.remove('hidden');
});

barPauseBtn.addEventListener('click', () => {
    video.pause();
    playBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    barPlayBtn.classList.remove('hidden');
    barPauseBtn.classList.add('hidden');
});

barRestartBtn.addEventListener('click', () => {
    restartBtn.classList.add('hidden');
    barRestartBtn.classList.add('hidden');
    video.currentTime = 0;
    video.play();
    pauseBtn.classList.remove('hidden');
    barPauseBtn.classList.remove('hidden')
});