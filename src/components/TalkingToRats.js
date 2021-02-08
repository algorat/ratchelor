import React from "react";
import responsesJson from '../responses.json';

const OFF_LEFT = -550;
const OFF_BOTTOM = -400;
class TalkingToRats extends React.Component {
  constructor(props) {
    super(props);
    // Randomly shuffle the rats for this round
    this.ratNames = props.activeRatNames.sort(function (a, b) { return 0.5 - Math.random() })
    // Get all of the round's rats based on their names
    this.activeRats = this.ratNames.map((ratName) => this.props.getRatByName(ratName));
    // Store all of your canned responses in an array
    this.responses = responsesJson;
    this.charSpeed = 30;
    this.ratMoveSpeed = 10;
    this.state = {
      ratIndex: 0,
      charsRevealed: 0,
      responses: [],
      ratLeft: OFF_LEFT,
      ratTop: 0,
      dialogueBottom: OFF_BOTTOM,
      incr: 1
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.sendRatIn();
    }, this.props.startDelay)
  }

  componentWillUnmount() {
    if(this.ratMoveInInterval !== null){
      window.clearInterval(this.ratMoveOutInterval);
    }
    if(this.ratMoveOutInterval !== null){
      window.clearInterval(this.ratMoveOutInterval);
    }
    if(this.textInterval !== null){
      window.clearInterval(this.textInterval);
    }
  }

 sendRatIn() {
  this.getRandomResponses();
  this.setState({incr: 25})
  window.clearInterval(this.ratMoveOutInterval);
    this.ratMoveInInterval = window.setInterval(() => {
      if (this.state.ratLeft < 0) {
        this.setState({ratLeft: this.state.ratLeft + this.state.incr})
        if (this.state.dialogueBottom < 0) {
          let dialogueBottom = this.state.dialogueBottom + this.state.incr;
          if (dialogueBottom > 0) dialogueBottom = 0;
          this.setState({incr: this.state.incr * 0.95});
          this.setState({dialogueBottom})
        }
      } else {
        window.clearInterval(this.ratMoveInInterval);
        this.startTextMoving();
      }
    }, this.ratMoveSpeed);
  }

  sendRatOut() {
    window.clearInterval(this.ratMoveInInterval);
    this.setState({responses: "", incr: 1})
    this.ratMoveOutInterval = window.setInterval(() => {
      if (this.state.ratLeft > OFF_LEFT) {
        this.setState({ratLeft: this.state.ratLeft - this.state.incr})
        if (this.state.dialogueBottom > OFF_BOTTOM) {
          let dialogueBottom = this.state.dialogueBottom - this.state.incr;
          if (dialogueBottom < OFF_BOTTOM) dialogueBottom = OFF_BOTTOM;
          this.setState({dialogueBottom})
          this.setState({incr: this.state.incr * 1.05});
        }
      } else {
        window.clearInterval(this.ratMoveOutInterval);
        this.setState({charsRevealed: 0})
        this.setNextRat();
      }
    }, this.ratMoveSpeed);
  }

  startTextMoving() {
    this.setState({charsRevealed: 0});
    this.textInterval = window.setInterval(() => {
      let charsRevealed = this.state.charsRevealed + 1;
      if (charsRevealed > this.activeRats[this.state.ratIndex].dialogue[this.props.round].length) {
        window.clearInterval(this.textInterval);
      } else {
        this.setState({charsRevealed})
      }
    }, this.charSpeed)
  }

  setNextRat() {
    let newRatIndex = this.state.ratIndex + 1;
    // If that was the last rat, advance to the rose ceremony
    if (newRatIndex === this.ratNames.length) {
      this.props.goToRoseCeremony();
    } else {
      this.setState ({ratIndex: newRatIndex})
      this.props.changeCurrentRatIdx(newRatIndex);
      this.sendRatIn();
    }
  }

  // After you submit your response, choose a new rat
  submitResponse() {
    window.clearInterval(this.textInterval)
    this.sendRatOut();
  }

  getRandomResponses() {
    // Make sure we get random, different responses
    const numResponses = 3;
    // Shuffle all responses
    responsesJson.sort( () => .5 - Math.random() )
    let responses = [];
    // Choose the first n
    for (let i = 0; i < numResponses; i++) {
      let responseText = responsesJson[i]
      let responseDiv = <button onClick={this.submitResponse.bind(this)} key={i}>{responseText}</button>
      responses.push(responseDiv);
    }
    this.setState({responses});
  }

  // You get a random rat, they talk to you, you can respond, after you respond another rat shows up
  render() {
    let ratDialogue = this.activeRats[this.state.ratIndex].dialogue[this.props.round].substring(0, this.state.charsRevealed);
    if (ratDialogue.length === 0) ratDialogue = "...";
    return (
      <div id="talkingToRatsScreen" className="screen">
      <img id="playerRat" 
      alt="you as a rat, on the couch"
      src={`/ratchelor/img/Couch/you.png`}></img>
      <img id="talkingRat" 
      alt="a rat on the couch who is talking to you"
      style={{left: `${this.state.ratLeft}px`, top: `${this.state.ratTop}px`}}
      src={`/ratchelor/img/Couch/${this.activeRats[this.state.ratIndex].filename}.png`}></img>
      <div id="dialogueContainer" style={{bottom: `${this.state.dialogueBottom}px`}}>
        <div id="ratName">{this.activeRats[this.state.ratIndex].name}</div>
        <div id="ratDialogue">{ratDialogue}</div>
      </div>
      <div id="responses" style={{bottom: `${this.state.dialogueBottom + 10}px`}}>{this.state.responses}</div>
    </div>
    );
  }
}

export default TalkingToRats;

