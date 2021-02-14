import React from "react";
import specialEndingRats from '../specialEndingRats.json';
import ratsJson from "../rats.json";

class RatSelect extends React.Component {
  constructor(props) {
    super(props);
    this.text  = []
    this.offLimitRats = [this.getRatByName(props.finalRat)]
    this.beginningRatPool= props.beginningRatPool
    this.photos =[]
    for(let i = 0 ; i < this.beginningRatPool.length ; i ++){
      var f = this.getRatEndingFilename(this.beginningRatPool[i]);
      console.log("hello")
      if (f != undefined){
        this.photos[this.photos.length] = f

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
    var ti = this.text.length
    var corats = []
    var noFileFound = false;
    for (let i = 0; i < specialEndingRats.length; i++) {

      if (specialEndingRats[i].rat === name) {
        if(name == "miggmouse"){
          console.log("MIGD")
          
        }
        var numEndings = specialEndingRats[i].photos.length
        if(name == "miggmouse"){
          console.log("numendings: ")
          console.log(numEndings)
        }
        var idx = 0 //Math.floor(Math.random() * numEndings)
        //var coRat = [this.offLimitRats[0]]
        // add this rat
        // just set it to something that will start the while loop
        var j = 0
        var noViableEnding = true;
        console.log(this.offLimitRats)
        while(noViableEnding){
          
          retVal = specialEndingRats[i].photos[idx].filename;
          corats = []
          console.log(retVal)
          switch(specialEndingRats[i].photos[idx].numRats){
            case 3:
              corats[corats.length] = specialEndingRats[i].photos[idx].Rat1
              noViableEnding = this.offLimitRats.indexOf(corats[corats.length-1]) >=0 
              corats[corats.length] = specialEndingRats[i].photos[idx].Rat2
              noViableEnding = noViableEnding || this.offLimitRats.indexOf(corats[corats.length-1]) >=0  

              corats[corats.length] = specialEndingRats[i].photos[idx].Rat3
              console.log("case3");
              noViableEnding = noViableEnding || this.offLimitRats.indexOf(corats[corats.length-1]) >= 0
              console.log("noViableEnding: " + noViableEnding)
              break
            case 2:
              console.log("case2")
              corats[corats.length] = specialEndingRats[i].photos[idx].Rat1
              noViableEnding = this.offLimitRats.indexOf(corats[corats.length-1]) >=0 
              corats[corats.length] = specialEndingRats[i].photos[idx].Rat2
              noViableEnding = noViableEnding || this.offLimitRats.indexOf(corats[corats.length-1]) >=0  
              console.log("noViableEnding: " + noViableEnding)
              break;
            
            case 1:
              console.log("case1")
              corats[corats.length] = specialEndingRats[i].photos[idx].Rat1
              noViableEnding = this.offLimitRats.indexOf(corats[corats.length-1]) >=0  
              console.log("noViableEnding: " + noViableEnding)
              break;
          
            }
          // break while loop
          if(j > numEndings){
            noViableEnding = false
            noFileFound= true;
            console.log()
          }
          idx = (idx + 1)%numEndings
          
          this.text[ti] = specialEndingRats[i].photos[idx].text
          // get the other rat involved
          j++
        }
        console.log(this.props.beginningRatPool)
        console.log("offlinint"+ this.offLimitRats)
        // console.log()
        // break;
        
      }
    }
    if(name == "miggmouse"){
      debugger
      }
    if(noFileFound){
      return undefined;
    }
    for (var i = 0 ; i < corats.length; i++){
      this.offLimitRats[this.offLimitRats.length] = corats[i];
    }
    // debugger;

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
    //console.log(this.photos)
    // console.log(photos)
    let ratsList = [<img id="specialBg" onClick={this.deselect.bind(this)} src={`/ratchelor/img/Photos/background.png`} alt="images on a table!"></img> ]

    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.photos.length; i++) {

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

