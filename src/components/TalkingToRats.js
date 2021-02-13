import React from "react";
import ReactionAnimation from './ReactionAnimation'
import responsesJson from "../responses.json";

const OFF_LEFT = -550;
const OFF_BOTTOM = -400;
const ON_BOTTOM = 25;
class TalkingToRats extends React.Component {
  constructor(props) {
    super(props);
    // Randomly shuffle the rats for this round
    this.ratNames = props.activeRatNames.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    // Get all of the round's rats based on their names
    this.activeRats = this.ratNames.map((ratName) =>
      this.props.getRatByName(ratName)
    );
    // Store all of your canned responses in an array
    this.responses = responsesJson;
    console.log(this.props)
    this.charSpeed = 30;
    this.ratMoveSpeed = 10;
    this.state = {
      ratIndex: 0,
      charsRevealed: 0,
      responses: [],
      ratLeft: OFF_LEFT,
      ratTop: 0,
      dialogueBottom: OFF_BOTTOM,
      incr: 1,
      reacting: false,
      lastActiveRat: -1,
      currReaction: null,
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.sendRatIn();
    }, this.props.startDelay);
  }

  componentWillUnmount() {
    if (this.ratMoveInInterval !== null) {
      window.clearInterval(this.ratMoveOutInterval);
    }
    if (this.ratMoveOutInterval !== null) {
      window.clearInterval(this.ratMoveOutInterval);
    }
    if (this.textInterval !== null) {
      window.clearInterval(this.textInterval);
    }

    if (this.reactionTimeout !== null) {
      window.clearTimeout(this.reactionTimeout);
    }
  }

  startReaction(reaction){
    let currReaction = null;
    if (reaction === "LOVE") {
      currReaction = "love2";
      this.props.playHarpSound();
    }
    if (reaction === "SAD") {
      this.props.playTromboneSound();
      currReaction = "bad1";
    }
    if (reaction === "NEUTRAL") {
      currReaction = "neutra1";
      this.props.playCricketsSound();
    }
    if (!currReaction) {
      this.sendRatOut();
      return;
    }
    this.setState({ responses: "", incr: 1, reacting: true, currReaction: currReaction, lastActiveRat: this.state.ratIndex });
    this.reactionTimeout = window.setTimeout(() => this.sendRatOut(), 1500)
  }

  sendRatIn() {
    this.getRandomResponses();
    this.setState({ incr: 25 });
    window.clearTimeout(this.reactionTimeout);
    window.clearInterval(this.ratMoveOutInterval);
    this.ratMoveInInterval = window.setInterval(() => {
      if (this.state.ratLeft < 0) {
        this.setState({ ratLeft: this.state.ratLeft + this.state.incr });
        if (this.state.dialogueBottom < 0) {
          let dialogueBottom = this.state.dialogueBottom + this.state.incr;
          if (dialogueBottom > 0) dialogueBottom = 0;
          this.setState({ incr: this.state.incr * 0.95 });
          this.setState({ dialogueBottom });
        }
      } else {
        window.clearInterval(this.ratMoveInInterval);
        this.startTextMoving();
      }
    }, this.ratMoveSpeed);
  }

  sendRatOut() {
    window.clearInterval(this.ratMoveInInterval);
    window.clearTimeout(this.reactionTimeout);
    this.ratMoveOutInterval = window.setInterval(() => {
      if (this.state.ratLeft > OFF_LEFT) {
        this.setState({ ratLeft: this.state.ratLeft - this.state.incr });
        if (this.state.dialogueBottom > OFF_BOTTOM) {
          let dialogueBottom = this.state.dialogueBottom - this.state.incr;
          if (dialogueBottom < OFF_BOTTOM) dialogueBottom = OFF_BOTTOM;
          this.setState({ dialogueBottom });
          this.setState({ incr: this.state.incr * 1.05 });
        }
      } else {
        window.clearInterval(this.ratMoveOutInterval);
        this.setState({ reacting: false });
        this.setState({ charsRevealed: 0 });
        this.setNextRat();
      }
    }, this.ratMoveSpeed);
  }

  startTextMoving() {
    this.setState({ charsRevealed: 0 });
    this.textInterval = window.setInterval(() => {
      let charsRevealed = this.state.charsRevealed + 1;
      if (
        charsRevealed >
        this.activeRats[this.state.ratIndex].dialogue[this.props.round].length
      ) {
        window.clearInterval(this.textInterval);
      } else {
        this.setState({ charsRevealed });
      }
    }, this.charSpeed);
  }

  setNextRat() {
    let newRatIndex = this.state.ratIndex + 1;
    this.setState({currReaction: null});
    // If that was the last rat, advance to the rose ceremony
    if (newRatIndex === this.ratNames.length) {
      this.props.goToRoseCeremony();
    } else {
      this.setState({ ratIndex: newRatIndex });
      this.props.changeCurrentRatIdx(newRatIndex);
      this.sendRatIn();
    }
  }

  // After you submit your response, choose a new rat
  submitResponse(reaction) {
    // console.log(reaction);
    window.clearInterval(this.textInterval);
    this.startReaction(reaction);
  }

  getRandomResponses() {
    // Make sure we get random, different responses
    const numResponses = 3;
    // Shuffle all responses
    responsesJson.sort(() => 0.5 - Math.random());
    let responses = [];
    // Choose the first n
    for (let i = 0; i < numResponses; i++) {
      let responseText = responsesJson[i].response;
      let reaction = responsesJson[i].reaction;
      let responseDiv = (
        <button onClick={
          () => {this.submitResponse.bind(this)(reaction);}
          } key={i}>
          {responseText}
        </button>
      );
      responses.push(responseDiv);
    }
    this.setState({ responses });
  }

  // You get a random rat, they talk to you, you can respond, after you respond another rat shows up
  render() {
    let ratDialogue = this.activeRats[this.state.ratIndex].dialogue[
      this.props.round
    ].substring(0, this.state.charsRevealed);
    if (this.state.currReaction) {
      ratDialogue = <img id="dialogueImg" alt="dialogue emoji" src={`/ratchelor/img/Reactions/reax/${this.state.currReaction}.PNG`}></img>
    }
    if (ratDialogue.length === 0) ratDialogue = "...";
    return (
      <div id="talkingToRatsScreen" className="screen">
        <img
          id="playerRat"
          alt="you as a rat, on the couch"
          src={this.props.playerRatUrl}
        ></img>
        <div id="talkingRatContainer">
        <img
          id="talkingRat"
          alt="a rat on the couch who is talking to you"
          style={{
            left: `${this.state.ratLeft}px`,
            top: `${this.state.ratTop}px`,
          }}
          src={`/ratchelor/img/Couch/${
            this.activeRats[this.state.ratIndex].filename
          }.png`}
        ></img>
        { this.state.reacting && this.state.currReaction &&
          <ReactionAnimation 
            emote={<img alt="" src={`/ratchelor/img/Reactions/reax/${this.state.currReaction}.PNG`}/>}
            left={this.activeRats[this.state.lastActiveRat].reaction_pos[0] * 100}
            top={this.activeRats[this.state.lastActiveRat].reaction_pos[1] * 100}
          />}
        </div>
        <div
          id="dialogueContainer"
          style={{ bottom: `${this.state.dialogueBottom}px` }}
        >
          <div id="ratName">{this.activeRats[this.state.ratIndex].name}</div>
          <div id="ratDialogue">{ratDialogue}</div>
        </div>
        <div
          id="responses"
          style={{ bottom: `${this.state.dialogueBottom + ON_BOTTOM}px` }}
        >
          {this.state.responses}
        </div>
      </div>
    );
  }
}

export default TalkingToRats;
