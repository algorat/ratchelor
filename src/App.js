import "./App.css";
import React from "react";
import IntroScreen from "./components/IntroScreen";
import RatSelect from "./components/RatSelect";
import TalkingToRats from "./components/TalkingToRats";
import RoseCeremony from "./components/RoseCeremony";
import AnimeEnding from "./components/AnimeEnding";

import ratsJson from './rats.json';

// Game Stages
const INTRO = 0;
const RAT_SELECT = 1;
const TALKING_TO_RATS = 2;
const ROSE_CEREMONY = 3;
const ANIME_ENDING = 4;
const SPECIAL_ENDING = 5;

class RatchelorGame extends React.Component {
  constructor() {
    super();
    // Num rats the person should select at the very beginning
    this.numRatsInGame = 6;
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
    };
  }

  // Reset everything to restart the game
  restartGame() {
    this.setState({
      gameStage: INTRO,
      roundNum: 0,
      activeRatNames: []
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

  render() {
    if (this.state.gameStage === INTRO) {
      // Intro screen: advances to next stage when complete
      return (
        <IntroScreen onClick={() => {this.setState({gameStage: RAT_SELECT})}}/> 
      );
    } else if (this.state.gameStage === RAT_SELECT) {
      // Rat select screen: 
      //    modifies the currently active rat names
      //    advances to the next stage when complete
      return (
        <RatSelect 
          rats={ratsJson} 
          numRatsInGame={this.numRatsInGame} 
          advanceState={() => this.setState({gameStage: TALKING_TO_RATS})}
          setActiveRats={(selectedRats) => {this.setState({activeRatNames: selectedRats});}}
          />
      )
    } else if (this.state.gameStage === TALKING_TO_RATS) {
      // Talking to rats screen:
      //    advances to the rose ceremony when done
      return (
        <TalkingToRats
          activeRatNames={this.state.activeRatNames}
          getRatByName={this.getRatByName}
          round={this.state.roundNum}
          goToRoseCeremony={() => this.setState({gameStage: ROSE_CEREMONY})}
        />
      )
    } else if (this.state.gameStage === ROSE_CEREMONY) {
      // Rose ceremony screen:
      //    either advances to the next talking round, or advances to the anime ending
      //    modifies the currently active rat names
      return (
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
              this.setState({gameStage: TALKING_TO_RATS, roundNum: newRoundNum})
            }
          }}
        />
      )
    } else if (this.state.gameStage === ANIME_ENDING) {
      // Anime ending screen:
      //    allows game to be restarted
      return (
        <AnimeEnding
          finalRat={this.getRatByName(this.state.activeRatNames[0])}
          restartGame={this.restartGame.bind(this)}
        />
      )
    }
  }
}



export default RatchelorGame;