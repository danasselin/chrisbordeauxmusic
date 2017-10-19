class Player {
  play(song) {
    console.log('playing', song);
  }

  pause(song) {
    console.log('pausing', song);
  }

  rewind(song) {
    console.log('rewinding', song);
  }

  executeCmd(cmd, song) {
    switch (cmd) {
      case 'pause':
        return this.pause(song);
      case 'rewind':
        return this.rewind(song);
      default:
        return this.play(song);
    }
  }
}

export default Player;
