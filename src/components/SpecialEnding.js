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

    this.offLimitRats = [props.finalRat]
   this.beginningRatPool= props.beginningRatPool
    this.state = {
      opacity: 1 
    }

  }
  getRatEndingFilename(name) {
    var retVal;
    for (let i = 0; i < specialEndingRats.length; i++) {
      if (specialEndingRats[i].name === name) {
        var numEndings = specialEndingRats[i].files.length
        var idx = 0 //Math.floor(Math.random() * numEndings)
        var coRat = this.offLimitRats[0]
        // add this rat
        // just set it to something that will start the while loop
        var j = 0
        while(this.offLimitRats.indexOf(coRat) >= 0 && j < numEndings){
          retVal = specialEndingRats[i].files[idx]
          coRat = specialEndingRats[i].coRats[idx]
          idx = (idx + 1)%numEndings
      
          // get the other rat involved
          j++
        }
      }
    }
    this.offLimitRats[this.offLimitRats.length] = name
    if(name != coRat){
      this.offLimitRats[this.offLimitRats.length] = coRat
    }
    return retVal;
  }
  onClick(){
    this.fadeInterval = window.setInterval(() => {
      let opacity = this.state.opacity - 0.01;
      if (opacity <= 0) {
        //this.props.onClick();
        window.clearInterval(this.fadeInterval);
      } else {
        console.log("done fading")
        this.setState({opacity});
      }
    }, 5);
  }

  render() {
    let photos = []
    let picElements = []
    for(let i = 0 ; i < this.beginningRatPool.length ; i ++){
      var f = this.getRatEndingFilename(this.beginningRatPool[i]);
      if (f != undefined){
        photos[photos.length] = f
      }
    }
    for(let j = 0 ; j < photos.length ; j ++){
      picElements.push(
        <img id="specialRatPic" key={j} 
        style={{
           top:(70* Math.random()) ,
           right: j*(20* Math.random()) + j*80,
           transform: "rotate("+Math.random()*15 + "deg)"
          }}
          src={"/ratchelor/img/Photos/"+photos[j]} alt="images on a table!"></img>         
      )
    }

    return (
      <div id="specialEndingScreen" className="screen" style={{opacity: this.state.opacity}}>
         <img id="specialBg" src={`/ratchelor/img/Photos/background.png`} alt="images on a table!"></img> 
        {/* <div id="animeText"> {this.props.finalRat.dialogue[this.props.finalRat.dialogue.length - 1]}</div> */}
        <div id="specialPicsOnTableContainer" >{picElements}</div>       
        <button id="restartButton" onClick={this.onClick.bind(this)}>RESTART</button>
        {/* <button onClick={this.onClick.bind(this)}>fade</button> */}
    </div>
    );
  }
}

export default SpecialEnding;

