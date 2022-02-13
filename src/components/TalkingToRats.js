import React from "react";
import ReactionAnimation from "./ReactionAnimation";
import responsesJson from "../responses.json";
import soundsToActionsJson from "../soundsToActions.json";
import MobileWrapper from "./MobileWrapper";

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
    this.sendFirstRatTimeout = null;
    this.numRatImgsLoaded = 0;
    this.ratImgs = [];
    this.roundNum = props.roundNum;
    // Store all of your canned responses in an array
    this.responses = responsesJson;
    this.charSpeed = 30;
    this.ratMoveSpeed = 10;
    this.rxnSound = "";
    this.state = {
      ratIndex: 0,
      charsRevealed: 0,
      responses: [],
      incr: 1,
      reacting: false,
      lastActiveRat: -1,
      ratDialogue: "",
      ratImgsLoaded: false,
    };
  }

  ratImgLoaded() {
    this.numRatImgsLoaded++;
    if (this.numRatImgsLoaded === this.activeRats.length) {
      this.setState({ ratImgsLoaded: true }, () => {
        if (this.sendFirstRatTimeout === null) {
          this.sendFirstRatTimeout = window.setTimeout(() => {
            this.sendRatIn();
          }, this.props.startDelay);
        }
      });
    }
  }

  preloadRatImgs() {
    // Preload timeout if images don't load in 3.8s
    window.setTimeout(() => {
      if (!this.state.ratImgsLoaded) {
        this.setState({ ratImgsLoaded: true }, () => {
          if (this.sendFirstRatTimeout === null) {
            this.sendFirstRatTimeout = 1;
            this.sendRatIn();
          }
        });
      }
    }, 4500);

    for (let i = 0; i < this.activeRats.length; i++) {
      const activeRat = this.activeRats[i];
      let filename = `/ratchelor/img/Couch/${activeRat.filename}.png`;
      if (activeRat.talking_to_rats_filename && this.roundNum < activeRat.talking_to_rats_filename.length) {
        const baseFilename = activeRat.talking_to_rats_filename[this.roundNum];
        filename = `/ratchelor/img/Couch/${baseFilename}.png`;
      }
      let imgHTML = <img key={i} id={`ratImg${i}`} onLoad={this.ratImgLoaded.bind(this)} alt="a rat who wants to fall in love with you" className="ratImg" src={filename}></img>
      this.ratImgs.push(imgHTML);
    }
  }

  componentDidMount() {
    this.preloadRatImgs();
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
    });
    this.rxnSound = rxnSound;
  }

  startReaction(responseReaction, props) {
    this.setState({
      responses: "",
      incr: 1,
      reacting: true,
      lastActiveRat: this.state.ratIndex,
      currReaction: responseReaction,
    });
    this.playReactionSound(responseReaction, props);
    this.reactionTimeout = window.setTimeout(() => this.sendRatOut(), 1500);
  }

  sendRatIn() {
    this.setState({ currReaction: null });
    this.getRandomResponses();
    document
      .getElementById("dialogueContainer")
      .classList.remove("leavingDialogue");
    document
      .getElementById(`ratImg${this.state.ratIndex}`)
      .classList.add("enteringRat");
    document
      .getElementById("dialogueContainer")
      .classList.add("enteringDialogue");
    window.setTimeout(this.startTextMoving.bind(this), 800);
  }

  sendRatOut() {
    document
      .getElementById(`ratImg${this.state.ratIndex}`)
      .classList.remove("enteringRat");
    document
      .getElementById("dialogueContainer")
      .classList.remove("enteringDialogue");
    document
      .getElementById(`ratImg${this.state.ratIndex}`)
      .classList.add("leavingRat");
    document
      .getElementById("dialogueContainer")
      .classList.add("leavingDialogue");
    window.setTimeout(() => {
      this.setState(
        { reacting: false, charsRevealed: 0, ratDialogue: "..." },
        () => this.setNextRat()
      );
    }, 800);
  }

  startTextMoving() {
    this.textInterval = window.setInterval(() => {
      let ratDialogue = this.activeRats[this.state.ratIndex].dialogue[
        this.props.round
      ].substring(0, this.state.charsRevealed);
      this.setState({ ratDialogue });
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
    let currentRat = this.activeRats[this.state.ratIndex];
    //gets rat filename
    let currentRatFilename = currentRat["filename"];
    //grabs dialogue index
    let currentIndex = this.props.round;

    //all reaction/response couples for all rounds of chit-chat
    let currentRatResponses = responsesJson[currentRatFilename];

    //responses for current spoken dialogue only
    let currentRatResponseOptions = currentRatResponses[currentIndex];

    currentRatResponseOptions.sort(() => 0.5 - Math.random());

    let responses = [];
    // Choose the first n
    for (let i = 0; i < numResponses; i++) {
      let responseText = currentRatResponseOptions[i].response;
      let responseReaction = currentRatResponseOptions[i].reaction;
      let responseDiv = (
        <button
          onClick={() => {
            this.submitResponse.bind(this)(responseReaction, this.props);
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
          }}
          key={i}
        >
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
      ratDialogue = (
        <img
          id="dialogueImg"
          alt="dialogue emoji"
          src={`${process.env.PUBLIC_URL}/img/Reactions/${this.state.currReaction}.PNG`}
        ></img>
      );
    }
    if (ratDialogue.length === 0) ratDialogue = "...";
    return (
      <>
        <div id="talkingToRatsScreen" className="screen">
          <div className="hide-overflow">
            <img
              id="playerRat"
              alt="you as a rat, on the couch"
              src={this.props.playerRatUrl}
            ></img>
            <div id="allRats">{this.ratImgs}</div>
            <div id="talkingRatContainer">
              {this.state.reacting && (
                <ReactionAnimation
                  emote={
                    <img
                      alt=""
                      src={`${process.env.PUBLIC_URL}/img/Reactions/${this.state.currReaction}.PNG`}
                    />
                  }
                  left={
                    this.activeRats[this.state.lastActiveRat].reaction_pos[0] *
                    100
                  }
                  top={
                    this.activeRats[this.state.lastActiveRat].reaction_pos[1] *
                    100
                  }
                />
              )}
            </div>
            <div id="dialogueContainer">
              <div id="ratName">
                {this.activeRats[this.state.ratIndex].name}
              </div>
              <div id="textDialogueContainer">
                <div id="ratDialogue"> {ratDialogue}</div>
                {!this.props.isOnMobile && (
                  <div id="responses">{this.state.responses}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper
            controlsStyled={true}
            header={"What will you say in response?"}
            bodyId={"responses"}
          >
            {this.state.responses}
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default TalkingToRats;
