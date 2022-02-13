import React from "react";

import assignRose from "../sounds/rose3.wav";
import badAction from "../sounds/bad_action_sfx.wav";
import newRound from "../sounds/curtains.mp3";
import selectAnswer from "../sounds/louder_tap.mp3";
import tap from "../sounds/louder_tap.mp3";
import crickets from "../sounds/crickets.mp3";
import harp from "../sounds/harp.mp3";
import trombone from "../sounds/trombone.mp3";
import chaching from "../sounds/chaching.mp3";
import ding from "../sounds/ding.mp3";
import metal from "../sounds/metal.mp3";
import tada from "../sounds/tada.mp3";
import chimes from "../sounds/chimes.mp3";
import wobble from "../sounds/wobble.mp3";

class SoundEffectController extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.playRoseSound = this.playRoseSound.bind(this);
    this.playBadActionSound = this.playBadActionSound.bind(this);
    this.playNewRoundSound = this.playNewRoundSound.bind(this);
    this.playSelectAnswer = this.playSelectAnswer.bind(this);
    this.playCricketsSound = this.playCricketsSound.bind(this);
    this.playHarpSound = this.playHarpSound.bind(this);
    this.playTromboneSound = this.playTromboneSound.bind(this);
    this.playTap = this.playTap.bind(this);
    this.playChachingSound = this.playChachingSound.bind(this);
    this.playDingSound = this.playDingSound.bind(this);
    this.playMetalSound = this.playMetalSound.bind(this);
    this.playTadaSound = this.playTadaSound.bind(this);
    this.playChimesSound = this.playChimesSound.bind(this);
    this.playWobbleSound = this.playWobbleSound.bind(this);

    this.props.setPlayRoseSound(this.playRoseSound);
    this.props.setPlayBadActionSound(this.playBadActionSound);
    this.props.setPlayTap(this.playTap);
    this.props.setPlayCricketsSound(this.playCricketsSound);
    this.props.setPlayHarpSound(this.playHarpSound);
    this.props.setPlayTromboneSound(this.playTromboneSound);
    this.props.setPlaySelectAnswer(this.playSelectAnswer);
    this.props.setPlayNewRoundSound(this.playNewRoundSound);
    this.props.setPlayChachingSound(this.playChachingSound);
    this.props.setPlayDingSound(this.playDingSound);
    this.props.setPlayMetalSound(this.playMetalSound);
    this.props.setPlayTadaSound(this.playTadaSound);
    this.props.setPlayChimesSound(this.playChimesSound);
    this.props.setPlayWobbleSound(this.playWobbleSound);

    this.volume = props.volume / 100 + 0.15;
    this.finalRat = null;
    this.currentRatIdx = -1;
    this.musicStarted = false;
  }

  shouldComponentUpdate(props) {
    if (props.volume === 0) {
      this.volume = 0;
      this.setVolume(this.volume);
      return false;
    }

    let newvolume = props.volume / 100 + 0.15;
    newvolume = newvolume > 1 ? 1 : newvolume;

    if (newvolume !== this.volume) {
      this.volume = newvolume;
      this.setVolume(this.volume);
    }

    return false;
  }

  playWobbleSound() {
    this.playSound(wobble);
  }

  playChimesSound() {
    this.playSound(chimes);
  }

  playTadaSound() {
    this.playSound(tada);
  }

  playMetalSound() {
    this.playSound(metal);
  }

  playDingSound() {
    this.playSound(ding);
  }

  playChachingSound() {
    this.playSound(chaching);
  }

  playCricketsSound() {
    this.playSound(crickets);
  }

  playTromboneSound() {
    this.playSound(trombone);
  }

  playHarpSound() {
    this.playSound(harp);
  }

  playRoseSound() {
    this.playSound(assignRose);
  }

  playBadActionSound() {
    this.playSound(badAction);
  }

  playNewRoundSound() {
    this.playSound(newRound);
  }

  playSelectAnswer() {
    this.playSound(selectAnswer);
  }

  playTap() {
    this.playSound(tap);
  }

  setVolume(vol) {
    if (this.rap && this.rap.volume !== vol) {
      this.rap.volume = vol;
    }
  }

  playSound(url) {
    if (this.rap) {
      this.rap.src = url;
      this.rap.volume = this.volume;
      this.rap.addEventListener("canplaythrough", () => {
        var playPromise = this.rap.play();
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

  render() {
    return (
      <audio
        src={this.url}
        ref={(element) => {
          this.rap = element;
        }}
        volume={this.volume}
      />
    );
  }
}

export default SoundEffectController;
