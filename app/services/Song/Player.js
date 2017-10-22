import { fetchSongPlayData, animate, getStartTime } from '../../helpers.jsx';

class Player {
  constructor() {
    this.audio = document.createElement('audio');
    this.song;
    this.progressBar;
    this.animationId;
    this.cmd;
  }

  play() {
    this.audio.play();
    this.startProgress();
  }

  pause() {
    this.audio.pause();
    this.endProgress(this.animationId);
  }

  rewind() {
    this.endProgress(this.animationId);
    this.initProgressBar();
    this.audio.load();
  }

  setProgressBar(progress) {
    this.progressBar.style.width = progress;
  }

  getProgressBar() {
    return document.getElementsByClassName('progress-bar')[0];
  }

  initProgressBar(progress = 0) {
    if (!this.progressBar) this.progressBar = this.getProgressBar();
    this.progressBar.style.width = this.setProgressBar(progress);
  }

  initPlayback() {
    if (this.audio.currentTime > 0) this.pause();
  }

  increaseProgress(progress) {
    if(this.cmd === 'play') this.progressBar.style.width = progress * 100 + '%';
  }

  endProgress(animationId) {
    cancelAnimationFrame(animationId);
  }

  startProgress() {
    const duration = this.audio.duration * 1000;
    const startTime = getStartTime.bind(null, this.audio.currentTime);
    const animateProgBar = animate({
      duration: duration,
      timing: timeFraction => timeFraction,
      draw: (progress) => {
        this.increaseProgress(progress);
      },
      player: this,
      startTime,
    });
    this.animationId = requestAnimationFrame(animateProgBar);
  }

  queue() {
    // todo: emit action while the song is 'loading...'
    this.initPlayback();
    this.initProgressBar();
    fetchSongPlayData(this.song)
      .then(({ link }) => {
        this.audio.src = link;
        // todo: emit action when the song is 'loaded'
      })
      .catch((err) => {
        console.log(err);
        // todo: emit action if fetch fails
      });
  }

  executeCmd(cmd, song) {
    this.cmd = cmd;
    this.song = song;
    switch (cmd) {
      case 'play':
        return this.play();
      case 'queued':
        return this.queue();
      case 'pause':
        return this.pause();
      case 'rewind':
        return this.rewind();
      default:
        return null;
    }
  }
}

export default Player;
