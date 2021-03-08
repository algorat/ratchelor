import React from "react";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      loadingText: "Loading",
    };
    this.setMobileYet = false;
    this.onClick = this.onClick.bind(this);
    this.button = (<button
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
    </button>)
  }

  componentDidUpdate(){
    if(this.props.isOnMobile && !this.setMobileYet){
      this.props.setMobileMenu(this.button);
      this.setMobileYet = true;
    }
  }

  componentWillUnmount(){
    if(this.props.isOnMobile){
      this.props.clearMobileMenu();
    }
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


    let loader = <div id="loadingText">{this.state.loadingText}</div>
    let percentLoadedText = Math.floor(this.props.percentLoaded * 100);
    loader = <div id="loadingText">Loading {percentLoadedText}%</div>

    return (
      <div
        id="introScreen"
        className={`screen loading-${this.props.isPreloading}`}
        style={{ opacity: this.state.opacity }}
      >
        {!this.props.isOnMobile && (this.props.isPreloading ? loader : this.button)}
        <div id="hideme" />
      </div>
    );
  }
}

export default IntroScreen;
