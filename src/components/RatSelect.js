import React from "react";
import { Row, Box } from "jsxstyle";


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
      let selectRatsButton = <button onClick={this.onClickSelectRats}>Select Rats</button>
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
      ratsList.push(
        <div key={i} id={`rat${i}`} className="ratList" onClick={() => {
            this.selectRat(this.props.rats[i].name, `rat${i}`);
          }}>
          {`${this.props.rats[i].name}`}
        </div>
      )
    }
    
    return (
      <div id="ratSelectScreen">
        <div>Select your rats for the game (choose {`${this.props.numRatsInGame}`}):</div>
        {ratsList}
        <div>Chosen: {this.state.selectedRats.join(",")}</div>
        {this.state.selectRatsButton}
    </div>
    );
  }
}

export default RatSelect;

