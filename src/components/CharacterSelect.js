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

    this.buttonAreaAfter = (
      <div id="button-container">
        <button
          onClick={( )=>{
            this.props.onClick(); 
            //this.props.playSelectAnswer();
          }
        }
        >
          Onwards!
        </button>
      </div>
    );

    this.buttonAreaBefore = (
      <div id="ratchelor-intro-question">Which rat do you want to be?</div>
    );
  }

  componentDidMount() {
    this.props.setMobileMenu(this.buttonAreaBefore)
  }

  componentWillUnmount() {
    this.props.clearMobileMenu();
  }

  render() {
    let buttonArea;
    if (this.state.ratSelected) {
      buttonArea = this.buttonAreaBefore;
    } else {
      buttonArea = this.buttonAreaAfter;
    }
    return (
      <div id="custom-character" className="screen">
        <div id="ratchelor-intro-container">
          <img
            alt=""
            id="hearts-header"
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
                  if(this.props.isOnMobile){
                    console.log("after")
                    this.props.setMobileMenu(this.buttonAreaAfter)
                  }
                }}
                key={`char${idx}`}
                src={`/ratchelor/img/Player/${idx + 1}_intro.png`}
              />
            ))}
        </div>
        {!this.props.isOnMobile && buttonArea}
      </div>
    );
  }
}

export default CharacterSelect;
