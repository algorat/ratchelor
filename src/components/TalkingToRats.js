import React from "react";
import responsesJson from '../responses.json';


class TalkingToRats extends React.Component {
  constructor(props) {
    super(props);
    // Randomly shuffle the rats for this round
    this.ratNames = props.activeRatNames.sort(function (a, b) { return 0.5 - Math.random() })
    // Get all of the round's rats based on their names
    this.activeRats = this.ratNames.map((ratName) => this.props.getRatByName(ratName));
    // Store all of your canned responses in an array
    this.responses = responsesJson;
    this.charSpeed = 36;
    this.state = {
      ratIndex: 0,
      charsRevealed: 0,
      responses: [],
    }
  }

  componentDidMount() {
    this.startTextMoving();
    this.getRandomResponses();
  }

  startTextMoving() {
    this.setState({charsRevealed: 0});
    this.interval = window.setInterval(() => {
      let charsRevealed = this.state.charsRevealed + 1;
      if (charsRevealed > this.activeRats[this.state.ratIndex].dialogue[this.props.round].length) {
      } else {
        this.setState({charsRevealed})
      }
    }, this.charSpeed)
  }

  // After you submit your response, choose a new rat
  submitResponse() {
    window.clearInterval(this.interval)
    this.startTextMoving();
    this.getRandomResponses();
    let newRatIndex = this.state.ratIndex + 1;
    // If that was the last rat, advance to the rose ceremony
    if (newRatIndex === this.ratNames.length) {
      this.props.goToRoseCeremony();
    } else {
      this.setState ({ratIndex: newRatIndex})
    }
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
    if (ratDialogue.length === 0) ratDialogue = ".";
    return (
      <div id="talkingToRatsScreen">
      <img id="playerRat" src={`/ratchelor/img/Couch/you.png`}></img>
      <img id="talkingRat" src={`/ratchelor/img/Couch/${this.activeRats[this.state.ratIndex].filename}.png`}></img>

      <div id="dialogueContainer">
        <div id="ratName">{this.activeRats[this.state.ratIndex].name}</div>
        <div id="ratDialogue">{ratDialogue}</div>
      </div>
      <div id="responses">{this.state.responses}</div>
    </div>
    );
  }
}

export default TalkingToRats;

