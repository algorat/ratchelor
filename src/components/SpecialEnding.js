import React from "react";


class SpecialEnding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
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
    return (
      <div id="specialEndingScreen" className="screen" style={{opacity: this.state.opacity}}>
         <img id="animePic" src={`/ratchelor/img/Photos/background.png`} alt="images on a table!"></img> 
        {/* <div id="animeText"> {this.props.finalRat.dialogue[this.props.finalRat.dialogue.length - 1]}</div> */}
        <button id="restartButton" onClick={this.onClick.bind(this)}>fade</button>
        <button onClick={this.onClick.bind(this)}>fade</button>
    </div>
    );
  }
}

export default SpecialEnding;

