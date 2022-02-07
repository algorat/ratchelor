import React from 'react';

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
    const MobileWrapper = this.props.mobileMenuWrapper;
    return (
      <>
        <div
          id="proposalScreen"
          style={{ opacity: this.state.opacity }}
          className="screen"
        >
          <img
            id="finalRat"
            alt="the rat that you're proposing to"
            className={`propose-${this.props.finalRat.size}`}
            src={`${process.env.PUBLIC_URL}/img/Characters/${this.props.finalRat.filename}.png`}
          ></img>
          <img
            id="proposingRat"
            alt="you are on one knee proposing"
            src={this.props.playerRatUrl}
          ></img>
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper>
            <div className="controls-wrapper">
              <p>*proposes : 3*</p>
            </div>
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default Proposal;
