import React from "react";

class RoseCeremony extends React.Component {
  constructor(props) {
    super(props);
    // Randomly shuffle the rats for this round
    this.ratNames = props.activeRatNames.sort(function (a, b) { return 0.5 - Math.random() })
    // Get all of the round's rats based on their names
    this.activeRats = this.ratNames.map((ratName) => this.props.getRatByName(ratName));
    // How many roses you have to give out
    this.numRoses = this.props.numRoses;

    this.state = {
      selectedRats: [],
      giveRosesButton: ""
    }
  }

  // When a rat is clicked
  selectRat(ratName, id) {
    // Get the element for the current rat button
    const element = document.getElementById(id);

    // If it's already chosen, deselect it
    if (this.state.selectedRats.indexOf(ratName) !== -1) {
      const index = this.state.selectedRats.indexOf(ratName);
      const newSelectedRats = this.state.selectedRats;
      newSelectedRats.splice(index, 1);
      this.setState({selectedRats: newSelectedRats});
      element.classList.remove("selectedRat");
      this.setState({giveRosesButton: ""})
      return;
    }

    // If you've already selected the max rats, you can't select another
    if (this.state.selectedRats.length === this.numRoses) {
      return;
    }

    // Otherwise, select this rat
    let newSelectedRats = this.state.selectedRats;
    newSelectedRats.push(ratName);
    element.classList.add("selectedRat");

    // If that was the final rat, display the advance button
    if (this.state.selectedRats.length === this.numRoses) {
      let giveRosesButton;
      if (this.numRoses === 1){
        giveRosesButton = <button onClick={this.endRoseCeremony.bind(this)}>Choose Contestant</button>;
      }
      else{
        giveRosesButton = <button onClick={this.endRoseCeremony.bind(this)}>Choose Contestants</button>;
      }
      this.setState({giveRosesButton});
      
    } else {
      this.setState({giveRosesButton: ""});
    }

    // Force a UI update for the rat list
    this.setState({});
  }

  endRoseCeremony() {
    this.props.setActiveRats(this.state.selectedRats);
    this.props.advanceState();
  }

  render() {
    let ratsList = []
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.activeRats.length; i++) {
      let filename = `/ratchelor/img/Characters/${this.activeRats[i].filename}.png`
      ratsList.push(
        <div key={i} id={`rat${i}`} className="ratList" onClick={() => {
            this.selectRat(this.activeRats[i].name, `rat${i}`);
          }}>
          {/* {`${this.activeRats[i].name}`} */}
          <img className="ratPic" src={filename} alt="a rat waiting for you to make a decision"/>
          <img className="rosePic" src="/ratchelor/img/temprose.png" alt="a rose" />
        </div>
      )
    }
    let roseContainer = []
    for (let i = 0; i < this.props.numRoses - this.state.selectedRats.length; i++) {
      roseContainer.push(<img className="roseIcon" src="/ratchelor/img/temprose.png" alt="a rose"></img>)
    }
    return (
      <div id="roseCeremonyScreen" className="screen">
        <div id="roseContainer">{roseContainer}</div>
        <div id="ratListContainer"> {ratsList}</div>
        <div id="giveRosesButton"> {this.state.giveRosesButton}</div>
    </div>
    );
  }
}

export default RoseCeremony;

