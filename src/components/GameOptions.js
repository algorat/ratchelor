import React from "react";

class GameOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="game-options">
        <div>Sound</div>
        <input min="0" max="100" type="range" value={this.props.volume} onChange={evt => this.props.changeVolume(parseInt(evt.target.value))} />
      </div>
    )
  }
}

export default GameOptions;

