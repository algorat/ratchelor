import React from "react";
import soundLogoMute from "../img/icons/volume_mute.png";
import soundLogo0 from "../img/icons/volume_0.png";
import soundLogo1 from "../img/icons/volume_1.png";
import soundLogo2 from "../img/icons/volume_2.png";
import soundLogo3 from "../img/icons/volume_3.png";

class GameOptions extends React.Component {
  render() {

    const prog = this.props.volume;
    let soundurl;

    if(this.props.isOnMobile) {
      if (prog === 0) {
        soundurl = soundLogoMute;
      } else {
        soundurl = soundLogo3;
      }
      
      const toggleSoundMobile = () => {
        if (this.props.volume === 0) {
          this.props.changeVolume(22);
        } else {
          this.props.changeVolume(0);
        }
      };
      return (
        <div id="game-options-mobile">
        <img
          src={soundurl}
          alt="Sound icon"
          className="sound-icon"
          onClick={toggleSoundMobile}
        />
        </div>
      )
    }

    if (prog === 0) {
      soundurl = soundLogoMute;
    } else if (prog < 25) {
      soundurl = soundLogo0;
    } else if (prog < 50) {
      soundurl = soundLogo1;
    } else if (prog < 75) {
      soundurl = soundLogo2;
    } else {
      soundurl = soundLogo3;
    }

    const toggleSound = () => {
      if (this.props.volume === 0) {
        this.props.changeVolume(18);
      } else {
        this.props.changeVolume(0);
      }
    };

    return (
      <div id="game-options">
        <img
          src={soundurl}
          alt="Sound icon"
          className="sound-icon"
          onClick={toggleSound}
        />
        <div className="sound-slider">
          <input
            min="0"
            max="100"
            type="range"
            value={this.props.volume}
            onChange={(evt) =>
              this.props.changeVolume(parseInt(evt.target.value))
            }
          />
          <div
            className="behind-slider"
            style={{
              backgroundImage: `linear-gradient(to right, #fffec6, #fffec6 ${prog}%, #977c40 ${prog}%, #977c40 100%)`,
            }}
          />
        </div>
      </div>
    );
  }
}

export default GameOptions;
