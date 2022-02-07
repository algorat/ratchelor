import React from "react";

import Cheerful from "../sounds/Cheerful.mp3";
import Funky from "../sounds/Funky.mp3";
import Intense from "../sounds/Intense.mp3";
import IntroScreen from "../sounds/Intro_Screen.mp3";
import Paris from "../sounds/Paris.mp3";
import Pop from "../sounds/Pop.mp3";
import RomanticHappy from "../sounds/Romantic_Happy.mp3";
import RomanticSad from "../sounds/Romantic_Sad.mp3";
import RoseCeremony from "../sounds/Rose_Ceremony.mp3";
import Talking1 from "../sounds/Talking_To_Rat_1.mp3";
import Talking2 from "../sounds/Talking_To_Rat_2.mp3";
import Talking3 from "../sounds/Talking_To_Rat_3.mp3";
import Talking4 from "../sounds/Talking_To_Rat_4.mp3";
import {
  RAT_SELECT,
  PLAYER_SELECT,
  TALKING_TO_RATS,
  ROSE_CEREMONY,
  ANIME_ENDING,
  PROPOSAL,
} from "../App";

const TalkingMusic = [Talking1, Talking2, Talking3, Talking4];
const Endings = {
  CHEERFUL: Cheerful,
  FUNKY: Funky,
  INTENSE: Intense,
  PARIS: Paris,
  POP: Pop,
  ROMANTICHAPPY: RomanticHappy,
  ROMANTICSAD: RomanticSad,
};

class MusicManager extends React.Component {
  constructor(props) {
    super(props);
    this.selectURL = this.selectURL.bind(this);
    this.url = this.selectURL(this.props.phase);
    this.playSound = this.playSound.bind(this);
    this.props.setCallPlaySound(this.playSound);
    this.volume = props.volume / 100 - 0.08;
    this.volume = this.volume < 0 ? 0 : this.volume;
    this.finalRat = null;
    this.currentRatIdx = -1;
    this.musicStarted = false;
  }

  shouldComponentUpdate(props) {
    if (this.props.phase < 1 && !this.musicStarted) {
      return false;
    }

    let needToRender = false;
    let newurl = this.selectURL(props.phase);

    if (newurl !== this.url) {
      this.url = newurl;
      needToRender = true;
    }

    let newvolume = props.volume / 100 - 0.08;
    newvolume = newvolume < 0 ? 0 : newvolume;

    if (this.volume !== newvolume) {
      this.volume = newvolume;
      this.setVolume(this.volume);
    }
    if (this.finalRat !== props.finalRat) {
      this.finalRat = props.finalRat;
      needToRender = true;
    }
    if (this.currentRatIdx !== props.currentRatIdx) {
      this.currentRatIdx = props.currentRatIdx;
      needToRender = true;
    }

    if (!this.musicStarted || needToRender) {
      this.playSound(this.phase);
    }

    return false;
  }

  setVolume(vol) {
    if (this.rap) {
      this.rap.volume = vol;
    }
  }

  playSound() {
    if (
      !this.musicStarted ||
      (this.url !== "" && this.rap && this.rap.src.indexOf(this.url) < 0)
    ) {
      this.rap.src = this.url;
      this.rap.volume = this.volume;
      this.rap.addEventListener("canplaythrough", () => {
        var playPromise = this.rap.play();
        this.musicStarted = true;
        if (playPromise !== undefined) {
          playPromise
            .then((_) => {})
            .catch((e) => {
              console.log("error caught", e);
            });
        }
      });
    }
  }

  selectURL(phase) {
    let url = IntroScreen;
    switch (phase) {
      case RAT_SELECT:
        url = IntroScreen;
        break;
      case PLAYER_SELECT:
        url = IntroScreen;
        break;
      case TALKING_TO_RATS:
        url = TalkingMusic[this.currentRatIdx % TalkingMusic.length];
        break;
      case ROSE_CEREMONY:
        url = RoseCeremony;
        break;
      case ANIME_ENDING:
        url = Endings[this.finalRat.ending];
        break;
      case PROPOSAL:
        url = Endings[this.props.finalRat.ending];
        break;
      default:
        url = IntroScreen;
    }
    return url;
  }

  render() {
    this.url = this.selectURL(this.props.phase);
    return (
      <audio
        src={this.url}
        ref={(element) => {
          this.rap = element;
        }}
        loop
        volume={this.props.phase < 2 ? 0 : this.volume}
      />
    );
  }
}

export default MusicManager;
