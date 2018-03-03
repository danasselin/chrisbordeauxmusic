import {
  animate,
  getStartTime,
  formatTime,
} from '~/app/js/helpers.jsx';

import {
  theNymphetsColor,
  landlineColor,
  obviousChildColor,
} from '~/app/js/constants';

const white = '#FFFFFF';

class Player {
  constructor({
    updateSongTime,
    selectSongFromAlbum,
    setSongPlayerCmd,
  }) {
    this.songNumber = 0;
    this.audio = document.createElement('audio');
    this.updateSongTime = updateSongTime;
    this.selectSongFromAlbum = selectSongFromAlbum;
    this.setSongPlayerCmd = setSongPlayerCmd;
    this.audio.ontimeupdate = () => {
      this.currentSongTime = formatTime(this.audio.currentTime);
    };
    this.album = {};
    this.albumColor = obviousChildColor;
  }

  play() {
    this.audio.play();
    this.startProgress();
    const songTimeId = setInterval(() => {
      if (this.cmd === 'play') {
        this.updateSongTime(this.currentSongTime);
      } else {
        clearInterval(songTimeId);
      }
    }, 1000);
  }

  pause() {
    this.audio.pause();
    this.endProgress(this.animationId);
  }

  rewind() {
    if (this.currentSongTime !== '0:00') {
      this.endProgress(this.animationId);
      this.audio.load();
      this.updateSongTime('0:00');
      this.initProgressBar();
    } else {
      this.back();
    }
  }

  forward() {
    if (this.songNumber < this.album.songs.length - 1) {
      this.songNumber += 1;
      const nextSong = this.album.songs[this.songNumber];
      this.selectSongFromAlbum(nextSong);
      this.setSongPlayerCmd('queued');
    }
  }

  back() {
    if (this.songNumber >= 1) {
      this.songNumber -= 1;
      const prevSong = this.album.songs[this.songNumber];
      this.selectSongFromAlbum(prevSong);
      this.setSongPlayerCmd('queued');
    }
  }

  setPlayerProgressColor(title) {
    if (title === 'Landline') {
      this.albumColor = landlineColor;
    } else if (title === 'The Nymphets') {
      this.albumColor = theNymphetsColor;
    } else {
      this.albumColor = obviousChildColor;
    }
  }

  setProgressBar(progress) {
    this.progressBar.style.background = `linear-gradient(90deg, ${this.albumColor} 0px, ${progress}%, ${white} 0px)`;
  }

  getProgressBar() {
    return document.getElementsByClassName('progress-bar')[0];
  }

  initProgressBar(progress = 0) {
    if (!this.progressBar) this.progressBar = this.getProgressBar();
    this.setProgressBar(progress);
  }

  initPlayback() {
    if (this.audio.currentTime > 0) this.pause();
  }

  increaseProgress(progress) {
    if (this.cmd === 'play') {
      this.setProgressBar(progress);
    }
  }

  endProgress(animationId) {
    cancelAnimationFrame(animationId);
  }

  startProgress() {
    const duration = this.audio.duration * 1000;
    const startTime = getStartTime.bind(null, this.audio.currentTime);
    const animateProgBar = animate({
      timing: timeFraction => timeFraction,
      draw: (progress) => {
        this.increaseProgress(progress * 100);
      },
      player: this,
      duration,
      startTime,
    });
    this.animationId = requestAnimationFrame(animateProgBar);
  }

  queue() {
    this.updateSongTime('0:00');
    this.initPlayback();
    this.initProgressBar();
    this.audio.src = this.selectedSong.path;
  }

  executeCmd(cmd) {
    this.cmd = cmd;
    switch (cmd) {
      case 'play':
        return this.play();
      case 'queued':
        return this.queue();
      case 'pause':
        return this.pause();
      case 'rewind':
        return this.rewind();
      case 'back':
        return this.rewind();
      case 'forward':
        return this.forward();
      case 'skip':
        return this.forward();
      default:
        return null;
    }
  }
}

export default Player;
