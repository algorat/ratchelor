import React from "react";

class IntroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      isPreloading: true,
      loadingText: "Loading",
      percentLoaded: 0
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.loadingInterval = window.setInterval(() => {
      let loadingText = this.state.loadingText;
      if (loadingText.length < 10) {
        loadingText += "."
      } else {
        loadingText = "Loading"
      }
      this.setState({loadingText})
    }, 500)
  }

  componentDidUpdate(prevProps) {
    if (this.props.isPreloading !== prevProps.isPreloading) {    
      this.setState({ isPreloading: false });
    }
    if (this.props.percentLoaded > prevProps.percentLoaded) {
      this.setState({percentLoaded: this.props.percentLoaded})
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
    let button = <button
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

    let loader = <div id="loadingText">{this.state.loadingText}</div>
    let percentLoadedText = Math.floor(this.state.percentLoaded * 100);
    loader = <div id="loadingText">Loading {percentLoadedText}%</div>
    return (
      <div
        id="introScreen"
        className={`screen loading-${this.state.isPreloading}`}
        style={{ opacity: this.state.opacity }}
      >
        {this.state.isPreloading ? loader : button}
        <div id="hideme" />
      </div>
    );
  }
}

export default IntroScreen;
