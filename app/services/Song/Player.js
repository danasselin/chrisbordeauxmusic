import { fetchSongPlayData, animate } from '../../helpers.jsx';

class Player {
  constructor() {
    this.song = '';
    this.audio = document.createElement('audio');
    this.visualizer = document.getElementsByClassName('visualizer-expander');
  }

  play() {
    this.audio.play();
    this.visualize();
  }

  visualize() {
    const duration = this.audio.duration * 1000;
    const elem = this.visualizer[0];
    console.log(duration, elem);
    animate({
      duration: duration,
      timing: function(timeFraction) {
        return timeFraction;
      },
      draw: function(progress) {
        elem.style.width = progress * 100 + '%';
      }
    });
  }

  pause() {
    this.audio.pause();
  }

  rewind() {
    this.audio.load();
  }

  queue() {
    // todo: emit action while the song is 'loading...'
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
    this.song = song;
    switch (cmd) {
      case 'queued':
        return this.queue();
      case 'pause':
        return this.pause();
      case 'rewind':
        return this.rewind();
      default:
        return this.play();
    }
  }
}

export default Player;
