import "./App.css";
import React from "react";
import IntroScreen from "./components/IntroScreen";
import RatSelect from "./components/RatSelect";
import TalkingToRats from "./components/TalkingToRats";
import RoseCeremony from "./components/RoseCeremony";
import AnimeEnding from "./components/AnimeEnding";
import SpecialEnding from "./components/SpecialEnding";
import MusicManager from "./components/MusicManager";
import SoundEffectController from "./components/SoundEffectController";
import GameOptions from "./components/GameOptions";
import CharacterSelect from "./components/CharacterSelect";
import Proposal from "./components/Proposal";

import ratsJson from "./rats.json";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import allPublicImagesForPreload from "./allPublicImages.json";

/* background img files for preload -- sry for the tech debt but its 1am */
import bg0 from "./img/Backgrounds/beach.png";
import bg1 from "./img/Backgrounds/couch.gif";
import bg2 from "./img/Backgrounds/curtains.png";
import bg3 from "./img/Backgrounds/garden.png";
import bg4 from "./img/Backgrounds/intro.gif";
//import bg7 from "./img/Backgrounds/rose_ceremony.png";
import bg5 from "./img/Backgrounds/wallpaper.png";

/* sound files for preload -- sry for the tech debt but its 1am */
import s1 from "./sounds/bad_action_sfx.wav";
import s2 from "./sounds/curtains.mp3";
import s3 from "./sounds/louder_tap.mp3";
import s5 from "./sounds/crickets.mp3";
import s6 from "./sounds/harp.mp3";
import s7 from "./sounds/trombone.mp3";
import s8 from "./sounds/Cheerful.mp3";
import s9 from "./sounds/Funky.mp3";
import s10 from "./sounds/Intense.mp3";
import s11 from "./sounds/Intro_Screen.mp3";
import s12 from "./sounds/Paris.mp3";
import s13 from "./sounds/Pop.mp3";
import s14 from "./sounds/Romantic_Happy.mp3";
import s15 from "./sounds/Romantic_Sad.mp3";
import s16 from "./sounds/Rose_Ceremony.mp3";
import s17 from "./sounds/Talking_To_Rat_1.mp3";
import s18 from "./sounds/Talking_To_Rat_2.mp3";
import s19 from "./sounds/Talking_To_Rat_3.mp3";
import s20 from "./sounds/Talking_To_Rat_4.mp3";
import s21 from "./sounds/chimes.mp3";
import s22 from "./sounds/tada.mp3";
import s23 from "./sounds/wobble.mp3";
import s24 from "./sounds/chaching.mp3";
import s25 from "./sounds/metal.mp3";

const backgroundSrc = [bg0, bg1, bg2, bg3, bg4, bg5];
const soundsToPreload = [s2, s3, s5, s6, s7, s11, s1, s21, s22, s23, s24, s25];
const soundsToAsyncLoad = [s17, s18, s19, s20, s16, s8, s9, s10, s12, s13, s14, s15];

// var firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_URL,
//   databaseURL: process.env.REACT_APP_DB_URL,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREID
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

// Game Stages
const INTRO = 0;
const PLAYER_SELECT = 1;
const RAT_SELECT = 2;
const TALKING_TO_RATS = 3;
const ROSE_CEREMONY = 4;
const ANIME_ENDING = 5;
const SPECIAL_ENDING = 6;
const PROPOSAL = 7;

const INTERLUDE_OFFSET = 900;
const ANIM_TIME = 400;

class RatchelorGame extends React.Component {
  constructor() {
    super();
    // Num rats the person should select at the very beginning
    this.numRatsInGame = 7;
    // How many rounds there are
    this.numRounds = 5;
    this.setProposedInDatabase = false;
    // How many roses get given out each round
    this.rosesPerRound = [5, 4, 3, 2, 1];

    this.allPublicImagesForPreload = allPublicImagesForPreload;
    this.backgroundSrc = backgroundSrc;
    this.soundsToPreload = soundsToPreload;
    this.soundsToAsyncLoad = soundsToAsyncLoad;

    this.state = {
      // What phase of the game we're in
      gameStage: INTRO,
      // What round of the rose-talking loop we're on
      roundNum: 0,
      //beginning rat pool for the special end
      beginningRatPool:[],
      // String list of all rat names currently still in the game
      activeRatNames: [],
      // Text for interlude screens that fall down
      interludeText: "Round 1",
      //the rat that we r currently talking to
      currentRatIdx: 0,
      volume: 15,
      playerIdx: -1,
      isPreloading: true,
      percentLoaded: 0.0,
      isShowingSafariMsg: false,
      isOnMobile: false,
      curtainsClass: "curtainsOff"
    };
    this.finalRat = ratsJson[3];
    this.changeCurrentRatIdx = this.changeCurrentRatIdx.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.changePlayerIdx = this.changePlayerIdx.bind(this);
    this.setCallPlaySound = this.setCallPlaySound.bind(this);
    this.setPlayRoseSound = this.setPlayRoseSound.bind(this);
    this.setPlayCricketsSound = this.setPlayCricketsSound.bind(this);
    this.setPlayHarpSound = this.setPlayHarpSound.bind(this);
    this.setPlayTromboneSound = this.setPlayTromboneSound.bind(this);
    this.setPlayBadActionSound = this.setPlayBadActionSound.bind(this);
    this.setPlayNewRoundSound = this.setPlayNewRoundSound.bind(this);
    this.setPlaySelectAnswer = this.setPlaySelectAnswer.bind(this);
    this.setPlayChachingSound = this.setPlayChachingSound.bind(this);
    this.setPlayDingSound = this.setPlayDingSound.bind(this);
    this.setPlayMetalSound = this.setPlayMetalSound.bind(this);
    this.setPlayTadaSound = this.setPlayTadaSound.bind(this);
    this.setPlayChimesSound = this.setPlayChimesSound.bind(this);
    this.setPlayWobbleSound = this.setPlayWobbleSound.bind(this);

    this.setPlayTap = this.setPlayTap.bind(this);
    this.donePreloading = this.donePreloading.bind(this);

    this.publicImgsLoaded= false;
    this.srcImgsLoaded= false;
    this.soundsLoaded= false;
  }

  donePreloading(){
    if(this.preloadTimeout){
      window.clearTimeout(this.preloadTimeout);
    }
    if (this.preloadInterval) {
      window.clearInterval(this.preloadInterval);
    }
    this.setState({isPreloading: false});
    this.asyncLoadSounds();
  }

  preload() {
    // let loadIncr = 1 / (this.allPublicImagesForPreload.length + this.backgroundSrc.length + this.soundsToPreload.length);
    // 30s total timeout
    const timeoutTime = 30000;
    const intervalTime = 100;
    const loadFracPerInterval = intervalTime / timeoutTime;

    this.preloadInterval = window.setInterval(() => {
      this.setState({percentLoaded: this.state.percentLoaded + loadFracPerInterval});
    }, intervalTime)

    this.preloadTimeout = window.setTimeout(() => {
      console.log("preloading timed out! continuing..");
      this.setState({isPreloading: false});
    }, timeoutTime);

    // PUBLIC IMAGES
    this.allPublicImagesForPreload.forEach(fullFilename => {
      var img = new Image();
      let filename = "";
      if (fullFilename.indexOf("public") !== -1) {
        filename = fullFilename.slice(7);
        filename = "/ratchelor/" + filename;
      }
      // Load image
      img.src = filename;
      img.onload = () => {
        let fileIdx = this.allPublicImagesForPreload.indexOf(fullFilename);
        if (fileIdx !== -1) {
          this.allPublicImagesForPreload.splice(fileIdx, 1);
        }
        if (this.allPublicImagesForPreload.length === 0 && !this.state.publicImgsLoaded) {
          console.log("all images loaded");
          this.publicImgsLoaded = true;
          if(this.srcImgsLoaded && this.soundsLoaded && this.publicImgsLoaded){
            this.donePreloading();
          }
        }
      }
    });

    // PRELOADED SOUNDS
    this.soundsToPreload.forEach(filename => {
      // Load sound
      var audio = new Audio(filename);
      
      audio.addEventListener("canplaythrough", () => {
        let fileIdx = this.soundsToPreload.indexOf(filename);
        if (fileIdx !== -1) {
          this.soundsToPreload.splice(fileIdx, 1);
        }
        if (this.soundsToPreload.length === 0) {
          console.log("all sounds loaded");
          this.soundsLoaded = true;
          if(this.srcImgsLoaded && this.soundsLoaded && this.publicImgsLoaded){
            this.donePreloading();
          }
        }
      });
      audio.load();
    })

    // SRC BACKGROUNDS
    backgroundSrc.forEach(filename => {
      var img = new Image();
      img.src = filename;

      img.onload = () => {
        let fileIdx = this.backgroundSrc.indexOf(filename);
        if (fileIdx !== -1) {
          this.backgroundSrc.splice(fileIdx, 1);
        }
        if (this.backgroundSrc.length === 0) {
          console.log("all src images loaded");
          this.srcImgsLoaded = true;
          if(this.srcImgsLoaded && this.soundsLoaded && this.publicImgsLoaded){
            this.donePreloading();
          }
        }
      }
    })

    

  }

  asyncLoadSounds(){
    this.soundsToAsyncLoad.forEach(fullFilename => {
      new Audio(fullFilename);
    })
  }

  beginInterludeAndAdvanceState(text, delay, newGameStage) {
    this.setState({ interludeText: text, curtainsClass: "curtainsIn" }, () => {
      window.setTimeout(() => {
          this.setState({ gameStage: newGameStage }, () => {
            window.setTimeout(() => {
              this.endInterlude();
            }, delay);
            }
          );
      }, ANIM_TIME); 
    });
  }

  endInterlude() {
    this.setState({curtainsClass: "curtainsOut"});
  }

  setCallPlaySound(f) {
    this.callPlaySound = f;
  }

  setPlayRoseSound(f){
    this.playRoseSound = f;
  }

  setPlayChachingSound(f){
    this.playChachingSound = f;
  }

  setPlayDingSound(f){
    this.playDingSound = f;
  }

  setPlayMetalSound(f){
    this.playMetalSound = f;
  }

  setPlayTadaSound(f){
    this.playTadaSound = f;
  }

  setPlayChimesSound(f){
    this.playChimesSound = f;
  }

  setPlayWobbleSound(f){
    this.playWobbleSound = f;
  }

  setPlayCricketsSound(f){
    this.playCricketsSound = f;
  }

  setPlayTromboneSound(f){
    this.playTromboneSound = f;
  }

  setPlayHarpSound(f){
    this.playHarpSound = f;
  }

  setPlayBadActionSound(f){
    this.playBadActionSound = f;
  }

  setPlayNewRoundSound(f){
    this.playNewRoundSound = f;
  }

  setPlaySelectAnswer(f){
    this.playSelectAnswer = f;
  }

  setPlayTap(f){
    this.playTap = f;
  }

  // Reset everything to restart the game
  restartGame() {
    console.log("restarting");
    this.setProposedInDatabase = false;
    this.setState(
      {
        gameStage: INTRO,
        roundNum: 0,
        activeRatNames: [],
        playerIdx: -1,
      },
      () => {
        console.log("done!");
      }
    );
  }

  changeCurrentRatIdx(idx) {
    this.setState({
      currentRatIdx: idx,
    });
  }

  changePlayerIdx(idx) {
    this.setState({
      playerIdx: idx,
    });
  }

  changeVolume(vol) {
    this.setState({
      volume: vol,
    });
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
    // this.database
    //   .ref("/")
    //   .child(ratName)
    //   .set(firebase.database.ServerValue.increment(1));
  }

  

  componentDidMount() {
    this.preload();
    this.interludeElement = document.getElementById("interlude");
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    this.setState({isShowingSafariMsg: isSafari});
    var isOnMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.setState({isOnMobile});
    if (isOnMobile) {
      document.getElementById("not-on-mobile").style.display = "none";
    }
    // this.database = firebase.database();
    this.randoRat = ratsJson[Math.floor(Math.random() * ratsJson.length)];
  }

  render() {
    let screen = "";
    let isPreloading = this.state.isPreloading;

    //console.log(isPreloading)
    
    if (this.state.gameStage === INTRO) {
      // Intro screen: advances to next stage when complete
      screen = (
        <IntroScreen
          playSound={() => {
            if (this.callPlaySound) {
              this.callPlaySound(this.state.gameStage + 1);
            }
            if(this.playNewRoundSound){
              this.playNewRoundSound()
            }
          }}
          isPreloading={isPreloading}
          percentLoaded={this.state.percentLoaded}
          onClick={() => {
            this.beginInterludeAndAdvanceState(
              "meet yourself",
              900,
              PLAYER_SELECT
            );
          }}
        />
      );
    } else if (this.state.gameStage === PLAYER_SELECT) {
      screen = (
        <CharacterSelect
          changePlayerIdx={this.changePlayerIdx}
          playerIdx={this.state.playerIdx}
          playSelectAnswer={this.playSelectAnswer}
          playTap={this.playTap}
          onClick={() => {
            this.beginInterludeAndAdvanceState(
              "meet your suitors",
              900,
              RAT_SELECT
            );
            if(this.playNewRoundSound){
              this.playNewRoundSound()
            }
          }}
        />
      );
    } else if (this.state.gameStage === RAT_SELECT) {
      // Rat select screen:
      //    modifies the currently active rat names
      //    advances to the next stage when complete
      screen = (
        <RatSelect
          rats={ratsJson}
          numRatsInGame={this.numRatsInGame}
          playTap={this.playTap}
          playSelectAnswer={this.playSelectAnswer}
          playBadActionSound={this.playBadActionSound}
          setActiveRatsAndAdvanceState={(selectedRats) => {
            this.setState({ activeRatNames: selectedRats, beginningRatPool: selectedRats }, () => {
              this.beginInterludeAndAdvanceState(
                `chit chat`,
                900,
                TALKING_TO_RATS
              );
              if(this.playNewRoundSound){
                this.playNewRoundSound()
              }
            });

          }}
        />
      );
    } else if (this.state.gameStage === TALKING_TO_RATS) {
      // Talking to rats screen:
      //    advances to the rose ceremony when done
      screen = (
        <TalkingToRats
          activeRatNames={this.state.activeRatNames}
          getRatByName={this.getRatByName}
          round={this.state.roundNum}
          startDelay={1000}
          playSelectAnswer={this.playSelectAnswer}
          playCricketsSound={this.playCricketsSound}
          playTromboneSound={this.playTromboneSound}
          playHarpSound={this.playHarpSound}
          playChachingSound={this.playChachingSound}
          playDingSound={this.playDingSound}
          playMetalSound={this.playMetalSound}
          playTadaSound={this.playTadaSound}
          playChimesSound={this.playChimesSound}
          playWobbleSound={this.playWobbleSound}
          playerRatUrl={`/ratchelor/img/Player/${this.state.playerIdx}.png`}
          goToRoseCeremony={() =>
            {this.beginInterludeAndAdvanceState(
              `who gets a rose?`,
              900,
              ROSE_CEREMONY
            )
            if(this.playNewRoundSound){
              this.playNewRoundSound()
            }
          }
            
          }
          changeCurrentRatIdx={this.changeCurrentRatIdx}
        />
      );
    } else if (this.state.gameStage === ROSE_CEREMONY) {
      // Rose ceremony screen:
      //    either advances to the next talking round, or advances to the anime ending
      //    modifies the currently active rat names
      screen = (
        <RoseCeremony
          activeRatNames={this.state.activeRatNames}
          getRatByName={this.getRatByName}
          playRoseSound={this.playRoseSound}
          playTap={this.playTap}
          playSelectAnswer={this.playSelectAnswer}
          playBadActionSound={this.playBadActionSound}
          numRoses={this.rosesPerRound[this.state.roundNum]}
          setActiveRatsAndAdvanceState={(selectedRats) => {
            this.setState({ activeRatNames: selectedRats }, () => {
              // Update the current round number
              const newRoundNum = this.state.roundNum + 1;
              // If that was the last round, advance to Anime
              if (newRoundNum === this.numRounds) {
                this.setState({ gameStage: PROPOSAL });
                // Else, keep talking to rats
              } else {
                this.setState({ roundNum: newRoundNum }, () =>
                {
                  this.beginInterludeAndAdvanceState(
                    `chit chat`,
                    900,
                    TALKING_TO_RATS
                  );
                  if(this.playNewRoundSound){
                    this.playNewRoundSound()
                  }
                });
              }
            });
          }}
        />
      );
    } else if (this.state.gameStage === PROPOSAL) {
      this.finalRat = this.getRatByName(this.state.activeRatNames[0]);
      if(!this.setProposedInDatabase){
        this.setProposedInDatabase = true;
        this.incrementTotalRatCount(this.state.activeRatNames[0]);
      }
      screen = (
        <Proposal
          finalRat={this.finalRat}
          playerRatUrl={`/ratchelor/img/Player/${this.state.playerIdx}_proposal.PNG`}
          advanceState={() => {
            this.setState({ gameStage: ANIME_ENDING });
          }}
        />
      );
    } else if (this.state.gameStage === ANIME_ENDING) {
      // Anime ending screen:
      //    allows game to be restarted
      screen = (
        <AnimeEnding
          winningRat={this.finalRat}
          epilogue={() => {
            this.beginInterludeAndAdvanceState(
              `where are they now?`,
              900,
              SPECIAL_ENDING
            );
            if(this.playNewRoundSound){
              this.playNewRoundSound()
            }
          }}
        />);

    }else if (this.state.gameStage === SPECIAL_ENDING) {
      // special ending screen:
      //    allows game to be restarted

      screen = 
        <SpecialEnding
          finalRat={this.getRatByName(this.state.activeRatNames[0]).filename}
          
          restartGame={() => {
            this.restartGame();
          }}
          getRatByName={(n) =>{
            this.getRatByName(n);
          }}
         
          beginningRatPool={this.state.beginningRatPool}
        />
   

    }

    let safariMsg = this.state.isShowingSafariMsg ? <div id="safari-container"><div id="safari-msg">This game has some issues in Safari, we recommend using Chrome or Firefox!</div><div id="safari-button" onClick={()=>{this.setState({isShowingSafariMsg: false})}}>x</div></div> : "";
    
    if ( this.state.isOnMobile )
     {
      let randoRatFilename = "";
      let randoRatName = "";
      if (this.randoRat) {
        randoRatFilename = this.randoRat.filename;
        randoRatName = this.randoRat.name;
      }
      return (
        <div id="mobile-container">
          <div id="mobile-message">{`To experience The Ratchelor, ${randoRatName} wants you to access this website on a desktop computer!`}</div>
          <img
            id="mobile-img"
            alt="a rat who loves you"
            src={`/ratchelor/img/Characters/${randoRatFilename}.png`}
          ></img>
        </div>
      );
    }
    return (
      <div id={`game-container`} className={`preloading-${isPreloading}`}>

        <div id="game">
          <img id="frame" src="/ratchelor/img/frameSmaller.png" alt=""></img>
          {safariMsg}

          <div id="interludeContainer" >
            {/* <div id="interlude" style={{ bottom: this.state.interludeBottom }}> */}
            <div id="interlude" className={`${this.state.curtainsClass}`}>
              <div id="interludeText">{this.state.interludeText}</div>
            </div>
            {screen}
          </div>

          <MusicManager
            setCallPlaySound={this.setCallPlaySound}
            phase={this.state.gameStage}
            finalRat={this.finalRat}
            currentRatIdx={this.state.currentRatIdx}
            volume={this.state.volume}
          />
          <SoundEffectController
           volume={this.state.volume}
          setPlayRoseSound={this.setPlayRoseSound}
          setPlayCricketsSound={this.setPlayCricketsSound}
          setPlayBadActionSound={this.setPlayBadActionSound}
          setPlayNewRoundSound={this.setPlayNewRoundSound}
          setPlaySelectAnswer={this.setPlaySelectAnswer}
          setPlayHarpSound={this.setPlayHarpSound}
          setPlayTromboneSound={this.setPlayTromboneSound}
          setPlayTap={this.setPlayTap}
          setPlayChachingSound={this.setPlayChachingSound}
          setPlayDingSound={this.setPlayDingSound}
          setPlayMetalSound={this.setPlayMetalSound}
          setPlayTadaSound={this.setPlayTadaSound}
          setPlayChimesSound={this.setPlayChimesSound}
          setPlayWobbleSound={this.setPlayWobbleSound}
          />
        </div>
        <GameOptions
          volume={this.state.volume}
          changeVolume={this.changeVolume}
        />
        
      </div>
    );
  }
}

export {
  INTRO,
  PLAYER_SELECT,
  RAT_SELECT,
  TALKING_TO_RATS,
  ROSE_CEREMONY,
  ANIME_ENDING,
  SPECIAL_ENDING,
  PROPOSAL,
};
export default RatchelorGame;
