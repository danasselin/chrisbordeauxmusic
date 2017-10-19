class Player {
  constructor() {
    this.song = '';
  }
  play() {
    console.log('playing', this.song);
  }

  pause() {
    console.log('pausing', this.song);
  }

  rewind() {
    console.log('rewinding', this.song);
  }

  queue() {
    console.log('ready to play', this.song);
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
