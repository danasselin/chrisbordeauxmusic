import React from 'react';
import '../../main.css';

class Song extends React.Component {
  constructor(props) {
    super(props);
    const {
      path_lower: pathLower,
      content_hash: contentHash,
      id,
    } = props.info;
    this.path = pathLower;
    this.contentHash = contentHash;
    this.id = id;
    this.getSong = this.getSong.bind(this);
    this.state = {};
  }

  getSong() {
    this.props.dbx.filesGetTemporaryLink({ path: `${this.path}` })
      .then((response) => {
        this.setState({ link: response.link });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { name } = this.props.info;
    const { link } = this.state;
    return (
      <figure className="song" onClick={ this.getSong }>
        <div className="song-img-placeholder"></div>
        <div className="song-controller">
          <h3>{ name }</h3>
        </div>
        {
          link ?
            <audio
              src={ link }
              preload="auto"
              controls></audio> :
            <p>Click to load song</p>
        }
      </figure>
    );
  }
}

export default Song;
