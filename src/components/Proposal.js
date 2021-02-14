import React from "react";

const FADE_DELAY = 3600;

class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1.0,
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.opacityInterval = window.setInterval(() => {
        if (this.state.opacity <= 0) {
          this.props.advanceState();
          window.clearInterval(this.opacityInterval);
        } else {
          let opacity = this.state.opacity - 0.01;
          this.setState({ opacity });
        }
      }, 10);
    }, FADE_DELAY);
  }

  render() {
    return (
      <div
        id="proposalScreen"
        style={{ opacity: this.state.opacity }}
        className="screen"
      >
        <img
          id="finalRat"
          className={`propose-${this.props.finalRat.size}`}
          src={`/ratchelor/img/Characters/${this.props.finalRat.filename}.png`}
        ></img>
        <img id="proposingRat" src={this.props.playerRatUrl}></img>
      </div>
    );
  }
}

export default Proposal;
