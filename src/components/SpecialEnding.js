import React from "react";
import specialEndingRats from '../specialEndingRats.json';

class RatSelect extends React.Component {
  constructor(props) {
    super(props);
    this.text  = []
    this.offLimitRats = [props.finalRat]
   this.beginningRatPool= props.beginningRatPool

    this.state = {
      opacity: 1,
      selectedRats: [],
      selectRatsButton: <div id="chooseText">Others have found love too!</div>
    }
  }
  getRatEndingFilename(name) {
    var retVal;
    var ti = this.text.length
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
          
          this.text[ti] = specialEndingRats[i].text[idx]
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
  // When a rat is clicked
  selectRat(id) {
    // Get the element for the current rat button
    if(this.selecctedID == id && this.selected == true){
      this.deselect();
      return;
    }
    
    if(this.selecctedID != null){
    this.deselect();
    }

    const element = document.getElementById(id);

    element.classList.add("selectedRat");
    this.selecctedID = id
    this.selected = true;

  }

  deselect(){
    const element = document.getElementById(this.selecctedID);
    this.selected = false;
    element.classList.remove("selectedRat");

  }
  random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
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
    let ratsList = [<img id="specialBg" onClick={this.deselect.bind(this)} src={`/ratchelor/img/Photos/background.png`} alt="images on a table!"></img> ]

    // Create a clickable div for every rat in the game
    for (let i = 0; i < photos.length; i++) {

      ratsList.push(
        <div key={i} id="ratContainer">
          <div  id={`rat${i}`} className="ratListItem" onClick={() => {
            this.selectRat( `rat${i}`);
          }}>
          <div className="ratPic">
            <img className="ratFrame"
            style={{
          width: "100%",
          "padding-top":(30* this.random(i-991))+"px" ,
          "padding-right": (30* this.random(i+123)) +"px",
          transform: "rotate("+(this.random(i+22)*30) + "deg) scale(2.24) ",
         
         }} src={"/ratchelor/img/Photos/"+photos[i]} alt=""/>
       
          </div>
          <div className="ratNameContainer">
          <div className="ratName">{`${this.text[i]}`}</div>
          </div>
        </div>
        </div>
      )
    }
    ratsList.push(
    <div style={{"top-padding":20}}> 
      <button id="restartButton" onClick={this.props.restartGame}>Restart?</button>
      </div>
    )
    return (
      <div id="SpecialEndingScreen" className="screen">

        <div id="ratListContainer">{ratsList}</div>

    </div>
    );
  }
}

export default RatSelect;

