import React from "react";


class AnimeEnding extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="animeEndingScreen" className="screen">
        You chose {`${this.props.finalRat.name}`}:
        <br/>
        {this.props.finalRat.dialogue[this.props.finalRat.dialogue.length - 1]}
        <button onClick={this.props.restartGame}>Restart Game</button>
    </div>
    );
  }
}

export default AnimeEnding;

