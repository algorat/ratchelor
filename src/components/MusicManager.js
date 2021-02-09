import React from "react";
import Sound from 'react-sound';

import Cheerful from '../sounds/Cheerful.mp3'
import Funky from '../sounds/Funky.mp3'
import Intense from '../sounds/Intense.mp3'
import IntroScreen from '../sounds/Intro_Screen.mp3'
import Paris from '../sounds/Paris.mp3'
import Pop from '../sounds/Pop.mp3'
import RomanticHappy from '../sounds/Romantic_Happy.mp3'
import RomanticSad from '../sounds/Romantic_Sad.mp3'
import RoseCeremony from '../sounds/Rose_Ceremony.mp3'
import Talking1 from '../sounds/Talking_To_Rat_1.mp3'
import Talking2 from '../sounds/Talking_To_Rat_2.mp3'
import Talking3 from '../sounds/Talking_To_Rat_3.mp3'
import Talking4 from '../sounds/Talking_To_Rat_4.mp3'
import {RAT_SELECT, PLAYER_SELECT, TALKING_TO_RATS, ROSE_CEREMONY, ANIME_ENDING, PROPOSAL} from '../App'

const TalkingMusic = [Talking1, Talking2, Talking3, Talking4];
const Endings = {
  CHEERFUL: Cheerful,
  FUNKY: Funky,
  INTENSE: Intense,
  PARIS: Paris,
  POP: Pop,
  ROMANTICHAPPY: RomanticHappy,
  ROMANTICSAD: RomanticSad
}

class MusicManager extends React.Component {

  constructor(props){
    super(props);
    window.soundManager.setup({debugMode: false});
  }

  render() {
    let url;
    switch (this.props.phase){
      case RAT_SELECT:
        url = IntroScreen;
        break;
      case PLAYER_SELECT:
        url = IntroScreen;
        break;
      case TALKING_TO_RATS:
        url = TalkingMusic[this.props.currentRatIdx % TalkingMusic.length];
        break;
      case ROSE_CEREMONY:
        url = RoseCeremony;
        break;
      case ANIME_ENDING:
        url = Endings[this.props.finalRat.ending];
        break;
      case PROPOSAL:
        url = Endings[this.props.finalRat.ending];
        break;
      default:
        url = null;
    }
    if(url){
      return (
        <Sound
          url={url}
          playStatus={Sound.status.PLAYING}
          onLoading={this.handleSongLoading}
          onPlaying={this.handleSongPlaying}
          onFinishedPlaying={this.handleSongFinishedPlaying}
          loop={true}
          volume={this.props.volume}
        />
      );
    } 
    return (<></>)
  }
}

export default MusicManager;

