import React from "react";

class AnimeEnding extends React.Component {
  render() {
    return (
      <div id="animeEndingScreen" className="screen">
        <img
          id="animePic"
          src={`/ratchelor/img/anime2/${this.props.winningRat.filename}.jpg`}
          alt="your chosen rat looking adoringly at you"
        ></img>
        <div id="animeText">
          {" "}
          {
            this.props.winningRat.dialogue[
              this.props.winningRat.dialogue.length - 1
            ]
          }
        </div>
        <button id="restartButton" onClick={this.props.epilogue}>
        Epilogue
        </button>
      </div>
    );
  }
}

export default AnimeEnding;
