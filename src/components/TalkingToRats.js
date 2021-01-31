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

    this.state = {
      ratIndex: 0,
    }
  }

  // After you submit your response, choose a new rat
  submitResponse() {
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
    return responses;
  }

  // You get a random rat, they talk to you, you can respond, after you respond another rat shows up
  render() {
    let responses = this.getRandomResponses();
    let ratDialogue = this.activeRats[this.state.ratIndex].dialogue[this.props.round];
    return (
      <div id="talkingToRatsScreen">
        talking to rat #{`${this.state.ratIndex + 1}`} out of {`${this.ratNames.length}`}<br/>
      <div id="ratName">{this.activeRats[this.state.ratIndex].name}:</div>
      <br/>
      {ratDialogue}
      {responses}
    </div>
    );
  }
}

export default TalkingToRats;

