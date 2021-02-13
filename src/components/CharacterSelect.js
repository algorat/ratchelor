import React from "react";

class CharacterImg extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.onClick}
        className={`player-img ${this.props.selected && "selected-img"}`}
      >
        {this.props.selected && (
          <img
            alt=""
            src="/ratchelor/img/Frames/hearts7.PNG"
            className="selected-bg"
          />
        )}
        <img src={this.props.src} alt="one of the selectable characters" />
      </div>
    );
  }
}

class CharacterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratSelected: false,
      transform: 1,
    };
  }

  componentDidMount() {
    // this.interval = window.setInterval(() => {
    //   let transform = -1 * this.state.transform
    //   this.setState({transform})
    //   console.log(transform)
    // }, 1000);
  }

  render() {
    let buttonArea;
    if (this.state.ratSelected) {
      buttonArea = (
        <div id="button-container">
          <button
            onClick={( )=>{
              this.props.onClick(); 
              //this.props.playSelectAnswer();
            }
          }
            style={{ display: this.props.playerIdx >= 0 ? "block" : "none" }}
          >
            Onwards!
          </button>
        </div>
      );
    } else {
      buttonArea = (
        <div id="ratchelor-intro-question">Which rat do you want to be?</div>
      );
    }
    return (
      <div id="custom-character" className="screen">
        <div id="ratchelor-intro-container">
          <img
            id="hearts-header"
            alt=""
            src="/ratchelor/img/Player/playerselecthearts.png"
          ></img>
          <div id="ratchelor-intro-title">You are The Ratchelor,</div>
          <div id="ratchelor-intro">
            A single rat looking for love. You will meet many rats and
            choose who to keep, round after round, until you find true love.
          </div>
        </div>
        <div id="custom-character-row">
          {Array(4)
            .fill("")
            .map((_, idx) => (
              <CharacterImg
                selected={idx + 1 === this.props.playerIdx}
                onClick={() => {
                  this.props.changePlayerIdx(idx + 1);
                  this.setState({ ratSelected: true });
                  this.props.playTap();
                }}
                key={`char${idx}`}
                src={`/ratchelor/img/Player/${idx + 1}_intro.png`}
              />
            ))}
        </div>
        {buttonArea}
      </div>
    );
  }
}

export default CharacterSelect;
