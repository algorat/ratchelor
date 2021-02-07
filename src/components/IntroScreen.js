import React from "react";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    }
  }

  onClick() {
    this.fadeInterval = window.setInterval(() => {
      let opacity = this.state.opacity - 0.01;
      if (opacity <= 0) {
        this.props.onClick();
        window.clearInterval(this.fadeInterval);
      } else {
        this.setState({opacity});
      }
    }, 5);
  }

  render() {
    return (
      <div id="introScreen" className="screen" style={{opacity: this.state.opacity}}>
        <button onClick={this.onClick.bind(this)}>Embark</button>
        <div id="hideme"/>
    </div>
    );
  }
}

export default IntroScreen;

