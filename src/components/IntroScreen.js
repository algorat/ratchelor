import React from "react";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.fadeInterval = window.setInterval(() => {
      let opacity = this.state.opacity - 0.01;
      if (opacity <= 0) {
        this.props.onClick();
        window.clearInterval(this.fadeInterval);
      } else {
        this.setState({ opacity });
      }
    }, 5);
  }

  render() {
    return (
      <div
        id="introScreen"
        className="screen"
        style={{ opacity: this.state.opacity }}
      >
        <button
          ref={(b) => {
            if (b) {
              b.addEventListener("click", () => {
                this.props.playSound();
              });
            }
          }}
          onClick={this.onClick}
        >
          Embark
        </button>
        <div id="hideme" />
      </div>
    );
  }
}

export default IntroScreen;
