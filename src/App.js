
import "./App.css";
import React from "react";
import IntroScreen from "./components/IntroScreen";
import CharacterSelect from "./components/CharacterSelect";
import RatSelect from "./components/RatSelect";
import TalkingToRats from "./components/TalkingToRats";
import RoseCeremony from "./components/RoseCeremony";
import AnimeEnding from "./components/AnimeEnding";
import MusicManager from "./components/MusicManager";
import GameOptions from "./components/GameOptions";
import ratsJson from './rats.json';
import firebase from "firebase";

var firebaseConfig = {
       
        
  messagingSenderId: "993096202246",
  appId: "1:993096202246:web:bf0ebeedc4c347640aeb87"
};
var firebaseConfig = {
  apiKey: "AIzaSyDimK5PvHd3hBT8Xoyup_ogKaSPT3Chwzc",
  authDomain: "ratchelor.firebaseapp.com",
  projectId: "ratchelor",
  databaseURL: "https://ratchelor-default-rtdb.firebaseio.com/",
  storageBucket: "ratchelor.appspot.com",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Game Stages
const INTRO = 0;
const PLAYER_SELECT = 1;
const RAT_SELECT = 2;
const TALKING_TO_RATS = 3;
const ROSE_CEREMONY = 4;
const ANIME_ENDING = 5;
const SPECIAL_ENDING = 6;

const INTERLUDE_OFFSET = 900;

class RatchelorGame extends React.Component {
  constructor() {
    super();
    // Num rats the person should select at the very beginning
    this.numRatsInGame = 7;
    // How many rounds there are
    this.numRounds = 5;
    // How many roses get given out each round
    this.rosesPerRound = [5, 4, 3, 2, 1];
    this.state = {
      // What phase of the game we're in
      gameStage: INTRO,
      // What round of the rose-talking loop we're on
      roundNum: 0,
      // String list of all rat names currently still in the game
      activeRatNames: [],
      // Text for interlude screens that fall down
      interludeText: "Round 1",
      //the rat that we r currently talking to
      currentRatIdx: 0,
      interludeBottom: INTERLUDE_OFFSET,
      incr: 5,
      volume: 25,
      playerIdx: -1
    };
    this.changeCurrentRatIdx = this.changeCurrentRatIdx.bind(this);
    this.changePlayerIdx = this.changePlayerIdx.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
  }

  beginInterludeAndAdvanceState(text, delay, newGameStage) {
    this.setState({interludeText: text});
    this.startInterludeInterval = window.setInterval(() => {
      let interludeBottom = this.state.interludeBottom - this.state.incr;
      if (interludeBottom <= 0) {
        interludeBottom = 0;
        if (newGameStage) {
          this.setState({gameStage: newGameStage});
        }
        window.clearInterval(this.startInterludeInterval);
        window.setTimeout(() => {
          this.endInterlude();
        }, delay);
      }
      this.setState({interludeBottom});
    }, 5)
  }

  endInterlude() {
    this.endInterludeInterval = window.setInterval(() => {
      let interludeBottom = this.state.interludeBottom + this.state.incr;
      if (interludeBottom >= INTERLUDE_OFFSET) {
        interludeBottom = INTERLUDE_OFFSET;
        window.clearInterval(this.endInterludeInterval);
      }
      this.setState({interludeBottom});
    }, 5)
  }

  // Reset everything to restart the game
  restartGame() {
    this.setState({
      gameStage: INTRO,
      roundNum: 0,
      activeRatNames: []
    })
  }

  changeCurrentRatIdx(idx){
    this.setState({
      currentRatIdx: idx
    })
  }

  changePlayerIdx(idx){
    this.setState({
      playerIdx: idx
    })
  }

  changeVolume(vol){
    this.setState({
      volume: vol
    })
  }

  // Takes a string rat name and returns the Json object with additional details
  getRatByName(name) {
    for (let i = 0; i < ratsJson.length; i++) {
      if (ratsJson[i].name === name) {
        return ratsJson[i];
      }
    }
  }

  incrementTotalRatCount(ratName) {
    this.database.ref('/').child(ratName).set(firebase.database.ServerValue.increment(1));
  }

  componentDidMount() {
    this.interludeElement = document.getElementById("interlude");
    this.database = firebase.database()
  }

  render() {
    let screen = "";
    if (this.state.gameStage === INTRO) {
      // Intro screen: advances to next stage when complete
      screen = <IntroScreen onClick={() => {
        this.beginInterludeAndAdvanceState("meet yourself", 2000, PLAYER_SELECT);
      }}/> 
    } else if (this.state.gameStage === PLAYER_SELECT) { 
      screen = <CharacterSelect 
        changePlayerIdx={this.changePlayerIdx} playerIdx={this.state.playerIdx}
        onClick={() => {this.beginInterludeAndAdvanceState("meet your suitors", 2000, RAT_SELECT);}}
      />
    } else if (this.state.gameStage === RAT_SELECT) {
      // Rat select screen: 
      //    modifies the currently active rat names
      //    advances to the next stage when complete
      screen = <RatSelect 
          rats={ratsJson} 
          numRatsInGame={this.numRatsInGame} 
          advanceState={() => {
            this.beginInterludeAndAdvanceState(`Round ${this.state.roundNum + 1}`, 2000, TALKING_TO_RATS);
          }}
          setActiveRats={(selectedRats) => {
            this.setState({activeRatNames: selectedRats});
          }}
          />
    } else if (this.state.gameStage === TALKING_TO_RATS) {
      // Talking to rats screen:
      //    advances to the rose ceremony when done
      screen = <TalkingToRats
          activeRatNames={this.state.activeRatNames}
          getRatByName={this.getRatByName}
          round={this.state.roundNum}
          startDelay={3000}
          playerRatUrl={`/ratchelor/img/Player/${this.state.playerIdx}.png`}
          goToRoseCeremony={() => this.beginInterludeAndAdvanceState(`Rose ceremony ${this.state.roundNum + 1}`, 2000, ROSE_CEREMONY)}
          changeCurrentRatIdx={this.changeCurrentRatIdx}
        />
    } else if (this.state.gameStage === ROSE_CEREMONY) {
      // Rose ceremony screen:
      //    either advances to the next talking round, or advances to the anime ending
      //    modifies the currently active rat names
      screen = 
        <RoseCeremony
          activeRatNames={this.state.activeRatNames}
          getRatByName={this.getRatByName}
          numRoses={this.rosesPerRound[this.state.roundNum]}
          setActiveRats={(selectedRats) => {this.setState({activeRatNames: selectedRats});}}
          advanceState={() => {
            // Update the current round number
            const newRoundNum = this.state.roundNum + 1;
            // If that was the last round, advance to Anime
            if (newRoundNum === this.numRounds) {
              this.setState({gameStage: ANIME_ENDING});
            // Else, keep talking to rats
            } else {
              this.beginInterludeAndAdvanceState(`Round ${this.state.roundNum + 2}`, 2000, TALKING_TO_RATS);
              this.setState({roundNum: newRoundNum})
            }
          }}
        />
    } else if (this.state.gameStage === ANIME_ENDING) {
      // Anime ending screen:
      //    allows game to be restarted
      this.incrementTotalRatCount(this.state.activeRatNames[0]);
      console.log(this.state.activeRatNames);
      screen = 
        <AnimeEnding
          finalRat={this.getRatByName(this.state.activeRatNames[0])}
          restartGame={this.restartGame.bind(this)}
        />
   
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      let randoRat = ratsJson[Math.floor(Math.random() * ratsJson.length)]
      let randoRatFilename = randoRat.filename
      return (
      <div id="mobile-container">
        <div id="mobile-message">{`To experience The Ratchelor, ${randoRat.name} wants you to access this website on a desktop computer!`}</div>
        <img id="mobile-img" src={`/ratchelor/img/Characters/${randoRatFilename}.png`}></img>
      </div>);
    }
    return (
      <div id="game-container">
        <div id="game">
          <img id="frame" src="/ratchelor/img/frameSmaller.png" alt=""></img>
          <div id="interludeContainer">
          <div id="interlude" style={{bottom: this.state.interludeBottom}}>
            <div id="interludeText">{this.state.interludeText}</div>
          </div>
          {screen}
          </div>
          <MusicManager 
            phase={this.state.gameStage} 
            finalRat={this.getRatByName(this.state.activeRatNames[0])} 
            currentRatIdx={this.state.currentRatIdx} 
            volume={this.state.volume}
          />
        </div>
        <GameOptions volume={this.state.volume} changeVolume={this.changeVolume}/>
       </div>
    )
  }
}


export {INTRO, PLAYER_SELECT, RAT_SELECT, TALKING_TO_RATS, ROSE_CEREMONY, ANIME_ENDING, SPECIAL_ENDING};
export default RatchelorGame;