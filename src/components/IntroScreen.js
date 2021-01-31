import React from "react";

class IntroScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="introScreen">
        <h1>This is the intro screen!</h1>
        <button onClick={this.props.onClick}>Start Game</button>
    </div>
    );
  }
}

export default IntroScreen;

