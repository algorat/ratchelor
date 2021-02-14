import React from "react";
import photosRats from '../photosRats.json';
import ratsJson from "../rats.json";

class RatSelect extends React.Component {
  constructor(props) {
    super(props);
    this.text  = []
    this.offLimitRats = [props.finalRat]
    this.beginningRatPool= props.beginningRatPool
    this.photos =[]
    for(let i = 0 ; i < this.beginningRatPool.length ; i ++){
      var f = this.getRatEndingFilename(this.beginningRatPool[i]);
      if (f !== undefined){
        this.photos[this.photos.length] = f[0]
        this.text[this.text.length] = f[1]

      }
    }
    this.state = {
      opacity: 1,
      selectedRats: [],
      selectRatsButton: <div id="chooseText">Others have found love too!</div>
    }
  }
  // Takes a string rat name and returns the Json object with additional details
  getRatByName(name) {
    for (let i = 0; i < ratsJson.length; i++) {
      if (ratsJson[i].name === name) {
        return ratsJson[i].filename;
      }
    }
  }
  getRatEndingFilename(fullName) {
    //from beginning pool
    var name = this.getRatByName(fullName)
    var retVal;
    var retText;
    //var ti = this.text.length
    var corats = []
    var noFileFound = false;
    for (let i = 0; i < photosRats.length; i++) {

      if (photosRats[i].rat === name) {
      
        var numEndings = photosRats[i].photos.length
       
        var idx = 0 //Math.floor(Math.random() * numEndings)
        //var coRat = [this.offLimitRats[0]]
        // add this rat
        // just set it to something that will start the while loop
        var j = 0
        var noViableEnding = true;
        // console.log(this.offLimitRats)
        while(noViableEnding){
          
          retVal = photosRats[i].photos[idx].filename;
          retText = photosRats[i].photos[idx].text

          corats = []
          // console.log(retVal)
          switch(photosRats[i].photos[idx].numRats){
            case 3:
              corats[corats.length] = photosRats[i].photos[idx].Rat1
              noViableEnding = this.offLimitRats.indexOf(corats[corats.length-1]) >=0 
              corats[corats.length] = photosRats[i].photos[idx].Rat2
              noViableEnding = noViableEnding || this.offLimitRats.indexOf(corats[corats.length-1]) >=0  
              corats[corats.length] = photosRats[i].photos[idx].Rat3
              // console.log("case3");
              noViableEnding = noViableEnding || this.offLimitRats.indexOf(corats[corats.length-1]) >= 0
              // console.log("noViableEnding: " + noViableEnding)
              break
            case 2:
              // console.log("case2")
              corats[corats.length] = photosRats[i].photos[idx].Rat1
              noViableEnding = this.offLimitRats.indexOf(corats[corats.length-1]) >=0 
              corats[corats.length] = photosRats[i].photos[idx].Rat2
              noViableEnding = noViableEnding || this.offLimitRats.indexOf(corats[corats.length-1]) >=0  
              // console.log("noViableEnding: " + noViableEnding)
              break;
            
            case 1:
              // console.log("case1")
              corats[corats.length] = photosRats[i].photos[idx].Rat1
              noViableEnding = this.offLimitRats.indexOf(corats[corats.length-1]) >=0  
              // console.log("noViableEnding: " + noViableEnding)
              break;
          
            }
          // break while loop
          if(j > numEndings){
            noViableEnding = false
            noFileFound= true;
            // console.log()
          }
          idx = (idx + 1)%numEndings
          
          // get the other rat involved
          j++
        }
      }
    }
    if(noFileFound){
      return undefined;
    }
    for (var i = 0 ; i < corats.length; i++){
      this.offLimitRats[this.offLimitRats.length] = corats[i];
    }
   

    return [retVal, retText];
  }
  // When a rat is clicked
  selectRat(id) {
    // Get the element for the current rat button
    if(this.selecctedID === id && this.selected === true){
      this.deselect();
      return;
    }
    
    if(this.selecctedID !== null){
    this.deselect();
    }

    const element = document.getElementById(id);
    if (element === null){
      return;
    }
    element.classList.add("selectedRat");
    this.selecctedID = id
    this.selected = true;


  }

  deselect(){
    const element = document.getElementById(this.selecctedID);
    this.selected = false;
    if (element === null){
      return;
    }
    element.classList.remove("selectedRat");

  }
  random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
  render() {
    //console.log(this.photos)
    // console.log(photos)
    let ratsList = [<img id="specialBg" onClick={this.deselect.bind(this)} src={`/ratchelor/img/Photos/background.png`} alt="images on a table!"></img> ]

    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.photos.length; i++) {
      if(this.text[i] === undefined){continue;}
      ratsList.push(
        <div key={i} id="ratContainer">
          <div  id={`rat${i}`} className="ratListItem">
          <div className="ratPic">
            <img className="ratFrame"
            style={{
          width: "100%",
          paddingTop:(30* this.random(i-991))+"px" ,
          paddingRight: (30* this.random(i+123)) +"px",
          transform: "rotate("+(this.random(i+22)*30) + "deg) scale(2.24) ",
         
         }} src={"/ratchelor/img/Photos/"+this.photos[i]} alt=""/>
       
          </div>
          <div className="ratNameContainer">
          <div className="ratName">{`${this.text[i]}`}</div>
          </div>
        </div>
        </div>
      )
    }
    ratsList.push(
    <div style={{paddingTop:20}}> 
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

