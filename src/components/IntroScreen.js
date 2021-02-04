import React from "react";

class IntroScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="introScreen">
        <button onClick={this.props.onClick}>Embark</button>
    </div>
    );
  }
}

export default IntroScreen;

