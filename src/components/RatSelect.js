import React from "react";

class RatSelect extends React.Component {
  constructor() {
    super();

    // Once you've select the rats, advance to the next stage
    this.onClickSelectRats = () => {
      this.props.setActiveRats(this.state.selectedRats);
      this.props.advanceState();
    }

    this.state = {
      selectedRats: [],
      selectRatsButton: ""
    }
  }

  // When a rat is clicked
  selectRat(ratName, id) {
    // Get the element for the current rat button
    const element = document.getElementById(id);

    // If it's already chosen, deselect it
    if (this.state.selectedRats.indexOf(ratName) != -1) {
      const index = this.state.selectedRats.indexOf(ratName);
      const newSelectedRats = this.state.selectedRats;
      newSelectedRats.splice(index, 1);
      this.setState({selectedRats: newSelectedRats});
      element.classList.remove("selectedRat");
      this.setState({selectRatsButton: ""})
      return;
    }

    // If you've already selected the max rats, you can't select another
    if (this.state.selectedRats.length === this.props.numRatsInGame) {
      return;
    }

    // Otherwise, select this rat
    let newSelectedRats = this.state.selectedRats;
    newSelectedRats.push(ratName);
    element.classList.add("selectedRat");

    // If that was the final rat, display the advance button
    if (this.state.selectedRats.length === this.props.numRatsInGame) {
      let selectRatsButton = <button onClick={this.onClickSelectRats}>Continue</button>
      this.setState({selectRatsButton});
    } else {
      this.setState({selectRatsButton: ""});
    }

    // Force a UI update for the rat list
    this.setState({});
  }

  render() {
    let ratsList = []
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.props.rats.length; i++) {
      let filename = `/ratchelor/img/Characters/${this.props.rats[i].filename}.png`
      ratsList.push(
        <div key={i} id="ratContainer">
          <div  id={`rat${i}`} className="ratListItem" onClick={() => {
            this.selectRat(this.props.rats[i].name, `rat${i}`);
          }}>
          <div className="ratName">{`${this.props.rats[i].name}`}</div>

          <img className="ratPic" src={filename}/>
        </div>
        </div>
      )
    }
    
    return (
      <div id="ratSelectScreen" className="screen">
        <div id="chooseText">Choose your {`${this.props.numRatsInGame}`} lovely contestants:</div>
        <div id="ratListContainer">{ratsList}</div>
        {this.state.selectRatsButton}
    </div>
    );
  }
}

export default RatSelect;

