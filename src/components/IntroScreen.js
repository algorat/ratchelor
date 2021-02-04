import React from "react";

class IntroScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="introScreen">
        <button onClick={this.props.onClick}>Embark</button>
        <div id="hideme"/>
    </div>
    );
  }
}

export default IntroScreen;

