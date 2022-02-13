import React from "react";
import MobileWrapper from "./MobileWrapper";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      loadingText: "Loading",
    };
    this.onClick = this.onClick.bind(this);
    this.button = (
      <button
        ref={(b) => {
          if (b) {
            b.addEventListener("click", () => {
              props.playSound();
            });
          }
        }}
        onClick={this.onClick}
      >
        Embark
      </button>
    );
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
    let loader = <div id="loadingText">{this.state.loadingText}</div>;
    let percentLoadedText = Math.floor(this.props.percentLoaded * 100);
    loader = <div id="loadingText">Loading {percentLoadedText}%</div>;
    const buttonOrLoader = this.props.isPreloading ? loader : this.button;

    return (
      <>
        <div
          id="introScreen"
          className={`screen loading-${this.props.isPreloading}`}
          style={{ opacity: this.state.opacity }}
        >
          {!this.props.isOnMobile && buttonOrLoader}
          <div id="hideme" />
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper>
            <div id="button-container">{buttonOrLoader}</div>
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default IntroScreen;
