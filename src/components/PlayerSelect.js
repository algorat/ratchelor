import React from "react";

class RatSelect extends React.Component {
  constructor() {
    super();

    // Once you've select the rats, advance to the next stage
    this.onClickSelectRats = () => {
      this.props.setActiveRats(this.state.selectedRats);
      this.props.advanceState();
    };

    this.state = {
      selectedRats: [],
      selectRatsButton: <div id="chooseText">Select your 7 contestants</div>,
    };
  }

  noContestantsLeft() {
    let selectRatsButton = (
      <div id="chooseText">
        <button onClick={this.onClickSelectRats}>Continue</button>
      </div>
    );
    this.setState({ selectRatsButton });
    document.getElementById("ratListContainer").classList.remove("stillRats");
  }

  oneContestantLeft() {
    let selectRatsButton = (
      <div id="chooseText">{`Select ${
        this.props.numRatsInGame - this.state.selectedRats.length
      } more contestant`}</div>
    );
    this.setState({ selectRatsButton });
    document.getElementById("ratListContainer").classList.add("stillRats");
  }

  multiContestantsLeft() {
    let selectRatsButton = (
      <div id="chooseText">{`Select ${
        this.props.numRatsInGame - this.state.selectedRats.length
      } more contestants`}</div>
    );
    this.setState({ selectRatsButton });
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
      this.setState({ selectedRats: newSelectedRats });
      element.classList.remove("selectedRat");
      if (this.state.selectedRats.length !== this.props.numRatsInGame - 1) {
        this.multiContestantsLeft();
      } else {
        this.oneContestantLeft();
      }
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
      this.noContestantsLeft();
    } else if (
      this.state.selectedRats.length !==
      this.props.numRatsInGame - 1
    ) {
      this.multiContestantsLeft();
    } else {
      this.oneContestantLeft();
    }

    // Force a UI update for the rat list

    this.setState({});
  }

  render() {
    let ratsList = [];
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.props.rats.length; i++) {
      let filename = `/ratchelor/img/Frames/${this.props.rats[i].filename}.PNG`;
      let filenameHearts = `/ratchelor/img/Frames/hearts${(i % 9) + 1}.PNG`;
      ratsList.push(
        <div key={i} id="ratContainer">
          <div
            id={`rat${i}`}
            className="ratListItem"
            onClick={() => {
              this.selectRat(this.props.rats[i].name, `rat${i}`);
            }}
          >
            <div className="ratPic">
              <img className="ratFrame" src={filename} alt="" />
              <img className="ratHearts" src={filenameHearts} alt="" />
            </div>
            <div className="ratNameContainer">
              <div className="ratName">{`${this.props.rats[i].name}`}</div>
              <div className="ratTagline">{`"${this.props.rats[i].tagline}"`}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div id="ratSelectScreen" className="screen">
        {this.state.selectRatsButton}
        <div id="ratListContainer" className="stillRats">
          {ratsList}
        </div>
      </div>
    );
  }
}

export default RatSelect;
