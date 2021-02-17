import React from "react";
import ReactionAnimation from './ReactionAnimation'
import responsesJson from "../responses.json";
import soundsToActionsJson from "../soundsToActions.json";

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
    this.charSpeed = 30;
    this.ratMoveSpeed = 10;
    this.rxnSound = "";
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
      ratDialogue: "",
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

  playReactionSound(rxn) {
    let rxnSound = "";

    Object.keys(soundsToActionsJson).forEach((sound) => {
      if (soundsToActionsJson[sound].includes(rxn)) {
        rxnSound = sound;
      }
    })
    this.rxnSound = rxnSound;

  }

  startReaction(responseReaction, props){
    this.setState({ responses: "", incr: 1, reacting: true, lastActiveRat: this.state.ratIndex , currReaction: responseReaction});
    this.playReactionSound(responseReaction, props);
    this.reactionTimeout = window.setTimeout(() => this.sendRatOut(), 1500)
  }

  sendRatIn() {
    this.setState({currReaction: null})
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
    if (this.textInterval) window.clearInterval(this.textInterval);
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
        this.setState({ reacting: false, charsRevealed: 0, ratDialogue: "..." }, 
          () => this.setNextRat()
        );
        
      }
    }, this.ratMoveSpeed);
  }

  startTextMoving() {
   
      this.textInterval = window.setInterval(() => {
        let ratDialogue = this.activeRats[this.state.ratIndex].dialogue[
          this.props.round
        ].substring(0, this.state.charsRevealed);
        this.setState({ratDialogue});
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
    // If that was the last rat, advance to the rose ceremony
    if (newRatIndex === this.ratNames.length) {
      this.props.goToRoseCeremony();
    } else {
      this.setState({ ratIndex: newRatIndex }, () => this.sendRatIn());
      this.props.changeCurrentRatIdx(newRatIndex);
    }
  }

  // After you submit your response, choose a new rat
  submitResponse(responseReaction, props) {
    window.clearInterval(this.textInterval);
    this.startReaction(responseReaction, props);
  }

  getRandomResponses() {

    // Make sure we get random, different responses 
    const numResponses = 3;
  
    //gets index of rat
    let currentRat = this.activeRats[this.state.ratIndex]
    //gets rat filename
    let currentRatFilename = currentRat["filename"]
    //grabs dialogue index
    let currentIndex = this.props.round

    //all reaction/response couples for all rounds of chit-chat
    let currentRatResponses = responsesJson[currentRatFilename]

    //responses for current spoken dialogue only
    let currentRatResponseOptions = currentRatResponses[currentIndex]

    currentRatResponseOptions.sort(() => 0.5 - Math.random());

    let responses = [];
    // Choose the first n
    for (let i = 0; i < numResponses; i++) {
      let responseText = currentRatResponseOptions[i].response;
      let responseReaction = currentRatResponseOptions[i].reaction;
      let responseDiv = (
        <button onClick={
          () => {this.submitResponse.bind(this)(responseReaction, this.props); 
                  this.props.playSelectAnswer();

                  if (this.rxnSound === "crickets") {
                    this.props.playCricketsSound();
                  } else if (this.rxnSound === "harp") {
                    this.props.playHarpSound();
                  } else if (this.rxnSound === "ding") {
                    this.props.playDingSound();
                  } else if (this.rxnSound === "metal") {
                    this.props.playMetalSound();
                  } else if (this.rxnSound === "chaching") {
                    this.props.playChachingSound();
                  } else if (this.rxnSound === "wobble") {
                    this.props.playWobbleSound();
                  } else if (this.rxnSound === "chimes") {
                    this.props.playChimesSound();
                  } else if (this.rxnSound === "womp") {
                    this.props.playTromboneSound();
                  } else if (this.rxnSound === "tada") {
                    this.props.playTadaSound();
                  }
                }
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
    let ratDialogue = this.state.ratDialogue;
    if (this.state.currReaction) {
      ratDialogue = <img id="dialogueImg" alt="dialogue emoji" src={`/ratchelor/img/Reactions/${this.state.currReaction}.PNG`}></img>
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
        { this.state.reacting && 
          <ReactionAnimation 

          
            emote={<img alt="" src={`/ratchelor/img/Reactions/${this.state.currReaction}.PNG`}/>}


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
