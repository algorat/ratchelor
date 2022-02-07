import React from "react";
import MobileWrapper from "./MobileWrapper";

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
            src={`${process.env.PUBLIC_URL}/img/Frames/hearts7.PNG`}
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

    if (props.isOnMobile) {
      this.buttonAreaBefore = (
        <div id="button-container">
          <button className="unselect">Onwards!</button>
        </div>
      );

      this.buttonAreaAfter = (
        <div id="button-container">
          <button
            onClick={() => {
              this.props.onClick();
            }}
          >
            Onwards!
          </button>
        </div>
      );
    } else {
      this.buttonAreaAfter = (
        <div id="button-container">
          <button
            onClick={() => {
              this.props.onClick();
              //this.props.playSelectAnswer();
            }}
          >
            Onwards!
          </button>
        </div>
      );

      this.buttonAreaBefore = (
        <div id="ratchelor-intro-question">Which rat do you want to be?</div>
      );
    }
  }

  render() {
    let buttonArea;
    if (!this.state.ratSelected) {
      buttonArea = this.buttonAreaBefore;
    } else {
      buttonArea = this.buttonAreaAfter;
    }
    return (
      <>
        <div id="custom-character" className="screen">
          <div id="ratchelor-intro-container">
            <img
              alt=""
              id="hearts-header"
              src={`${process.env.PUBLIC_URL}/img/Player/playerselecthearts.png`}
            ></img>
            <div id="ratchelor-intro-title">You are The Ratchelor,</div>
            <div id="ratchelor-intro">
              A single rat looking for love. You will meet many rats and choose
              who to keep, round after round, until you find true love.
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
                  src={`${process.env.PUBLIC_URL}/img/Player/${
                    idx + 1
                  }_intro.png`}
                />
              ))}
          </div>
          {!this.props.isOnMobile && buttonArea}
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper
            controlsStyled={true}
            row={true}
            header={
              this.props.playerIdx < 0
                ? "Which rat do you want to be?"
                : "You have selected..."
            }
            cta={buttonArea}
          >
            <img
              src={`${process.env.PUBLIC_URL}/img/rose.png`}
              style={{ float: "left", width: "20%", marginRight: "12px" }}
            />
            {this.props.playerIdx < 0
              ? "Select one from the left panel to get started."
              : "Wonderful! Press Onwards if you're ready to continue."}
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default CharacterSelect;
