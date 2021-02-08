import React from "react";

class CharacterImg extends React.Component {

  render() {
    return (
      <div onClick={this.props.onClick} 
        className={`player-img ${this.props.selected && "selected-img"}`}
      >
        {this.props.selected && (<div className="selected-bg"></div>)}
        <img src={this.props.src} />
      </div>
    );
  }

}

class CharacterSelect extends React.Component {

  render() {
    return (
      <div id="custom-character" className="screen">
        <div id="ratchelor-intro">
          You are the ratchelor, a single rat looking for love. 
          You're about the enter a dating experience 
          where you will meet many rats and slowly choose who to keep, 
          round after round, until you find your true love.
        </div>
        <div id="ratchelor-intro-question">
          To begin, which rat are you?
        </div>
        <div id="custom-character-row">
          {Array(4).fill("").map((_, idx) => 
            <CharacterImg 
              selected={(idx + 1) === this.props.playerIdx} 
              onClick={() => this.props.changePlayerIdx(idx + 1)}
              key={`char${idx}`} src={`/ratchelor/img/Player/${idx + 1}_intro.png`}
            />)
          }
        </div>
        <div id="button-container">
          <button 
            onClick={this.props.onClick}
            style={{display: this.props.playerIdx >= 0 ? "block" : "none"}}>
              Onwards!
          </button>
        </div>
      </div>
    );
  }
}

export default CharacterSelect;

