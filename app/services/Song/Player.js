import { fetchSongPlayData } from '../../helpers.jsx';

class Player {
  constructor() {
    this.song = '';
    this.audio = document.createElement('audio');
  }
  play() {
    this.audio.play();
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
