import React from "react";
import specialEndingRats from '../specialEndingRats.json';
// "Bear_Largathon.png"
// "Bear_migg_mouse.png"
// "Bora.png"
// "Egg_Salad_Dr.png"
// "Eggsalad.png"
// "Emacs_EggSalad.png"
// "Gerrot.png"
// "Hempleton_Dr.png"
// "Hempleton_Lartiste.png"
// "Hiberdean.png"
// "Hiberdean_Midgeon.png"
// "Hottie_Thespule_Highness_Laure.png"
// "Hottie_Thespule_Midgeon.png"
// "Largathon_Bora_XIV.png"
// "One-Eared_Jerio_Reggie-231.png"
// "Ragadoo.png"
// "Slim_Jim_Highness_Laure.png"
// "Slim_Jim_Largathon.png"
// "Slim_Jim_Migg_Mouse.png"
// "Slim_Jim_One-Eared_Jerio.png"
// "Vim_Arealrat.png"
class SpecialEnding extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
      opacity: 1,
      beginningRatPool: props.beginningRatPool,
      photos: [],
      offLimitRats:[props.finalRat] // rats that shouldnt be in ending
    }

  }
  getRatEndingFilename(name) {
    var retVal;
    for (let i = 0; i < specialEndingRats.length; i++) {
      if (specialEndingRats[i].name === name) {
        var numEndings = specialEndingRats[i].files.length
        var idx = Math.floor(Math.random() * numEndings)
        var coRat = this.state.offLimitRats[0]
        // just set it to something that will start the while loop
        var j = 0
        while(this.state.offLimitRats.indexOf(coRat) >= 0 && j < numEndings)
          retVal = specialEndingRats[i].files[idx]
          coRat = specialEndingRats[i].coRats[idx]
          idx = (idx + 1)%numEndings
          // get the other rat involved, or empty string for self
          j++
      }
    }
  }
  onClick(){
    console.log("fadeeeee")
    this.fadeInterval = window.setInterval(() => {
      let opacity = this.state.opacity - 0.01;
      if (opacity <= 0) {
        console.log("done fading")
        //this.props.onClick();
        window.clearInterval(this.fadeInterval);
      } else {
        console.log("done fading")
        this.setState({opacity});
      }
    }, 5);
  }

  render() {
    for(let i = 0 ; i < this.state.beginningRatPool.length ; i ++){
      this.state.photos[i] = this.getRatEndingFilename[this.state.beginningRatPool[i]]
    }
    console.log(this.state.photos)
    return (
      <div id="specialEndingScreen" className="screen" style={{opacity: this.state.opacity}}>
         <img id="specialBg" src={`/ratchelor/img/Photos/background.png`} alt="images on a table!"></img> 
        {/* <div id="animeText"> {this.props.finalRat.dialogue[this.props.finalRat.dialogue.length - 1]}</div> */}
        <img id="specialRatPic0" src={"/ratchelor/img/Photos/"+this.state.photos[0]} alt="images on a table!"></img>         
        <button id="restartButton" onClick={this.onClick.bind(this)}>fade</button>
        <button onClick={this.onClick.bind(this)}>fade</button>
    </div>
    );
  }
}

export default SpecialEnding;

