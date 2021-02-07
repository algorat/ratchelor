import React from "react";


class AnimeEnding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="animeEndingScreen" className="screen">
        <img id="animePic" src={`/ratchelor/img/Anime/${this.props.finalRat.filename}.jpg`}></img>
        <div id="animeText"> {this.props.finalRat.dialogue[this.props.finalRat.dialogue.length - 1]}</div>
        <button id="restartButton" onClick={this.props.restartGame}>Restart?</button>
    </div>
    );
  }
}

export default AnimeEnding;

