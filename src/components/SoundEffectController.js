import React from "react";

import assignRose from "../sounds/rose3.wav";
import badAction from "../sounds/bad_action_sfx.wav";
import newRound from "../sounds/curtains.mp3";
import selectAnswer from "../sounds/louder_tap.mp3";
import tap from "../sounds/louder_tap.mp3";
import crickets from "../sounds/crickets.mp3";
import harp from "../sounds/harp.mp3";
import trombone from "../sounds/trombone.mp3";


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
    this.props.setPlayRoseSound(this.playRoseSound);
    this.props.setPlayBadActionSound(this.playBadActionSound);
    this.props.setPlayTap(this.playTap);
    this.props.setPlayCricketsSound(this.playCricketsSound);
    this.props.setPlayHarpSound(this.playHarpSound);
    this.props.setPlayTromboneSound(this.playTromboneSound);
    this.props.setPlaySelectAnswer(this.playSelectAnswer);
    this.props.setPlayNewRoundSound(this.playNewRoundSound);
    this.volume = this.props.volume/100 + 0.15;
    this.finalRat = null;
    this.currentRatIdx = -1;
    this.musicStarted = false;
  }

  shouldComponentUpdate(props) {
    if(this.props.volume != this.volume){
      
      if(props.volume === 0){
        this.volume = 0;
      } else {
        this.volume = props.volume / 100 + 0.15;
        this.volume = this.volume > 1 ? 1 : this.volume;
      }
      this.setVolume(this.volume);
    }
    return false;
  }

  playCricketsSound(){
    this.playSound(crickets);
  }

  playTromboneSound(){
    this.playSound(trombone);
  }

  playHarpSound(){
    this.playSound(harp);
  }

  playRoseSound(){
    this.playSound(assignRose);
  }

  playBadActionSound(){
    this.playSound(badAction);
  }

  playNewRoundSound(){
    this.playSound(newRound);
  }

  playSelectAnswer(){
    this.playSound(selectAnswer);
  }

  playTap(){
    this.playSound(tap);
  }

  setVolume(vol) {
    if (this.rap) {
      this.rap.volume = vol;
    }
  }

  playSound(url) {
    if ( this.rap ) {
      this.rap.src = url;
      this.rap.volume = this.volume;
      var playPromise = this.rap.play();
      if (playPromise !== undefined) {
        playPromise.then((_) => {});
      }
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
