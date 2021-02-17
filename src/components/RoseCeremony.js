import React from "react";

class RoseCeremony extends React.Component {
  constructor(props) {
    super(props);

    // How many roses you have to give out
    this.numRoses = this.props.numRoses;

    this.activeRats = [];
    this.backRowRats = [];
    this.frontRowRats = [];

    this.state = {
      selectedRats: [],
      giveRosesButton: "",
      instructions: `Choose ${this.props.numRoses} contestants to continue`,
      middleRowClass: "",
      allRatsSelectedClass: "notAllRatsSelected",
      lastRoseClass: ""
    };
  }

  componentDidMount() {
    if (this.props.numRoses === 1) {
      this.setState({ instructions: `Choose your soulmate` , lastRoseClass: "lastRose"});
    }
    // Randomly shuffle the rats for this round
    this.ratNames = this.props.activeRatNames.sort(function (a, b) {
      return 0.5 - Math.random();
    });

    let backRowNames = [];
    let frontRowNames = [];

    let backRowSize = 0;
    let frontRowSize = 0;

    // Get the number of rats per row
    if (this.ratNames.length === 7) {
      backRowSize = 4;
      frontRowSize = 3;
    } else if (this.ratNames.length === 6) {
      backRowSize = 3;
      frontRowSize = 3;
    } else if (this.ratNames.length === 5) {
      backRowSize = 3;
      frontRowSize = 2;
    } else {
      backRowSize = this.ratNames.length;
      this.setState({ middleRowClass: "middleRow" });
    }

    // Find our special sized rats
    let bearIndex = this.ratNames.indexOf("Bear");
    let miggIndex = this.ratNames.indexOf("Migg Mouse");
    let largoIndex = this.ratNames.indexOf("Largathon");

    // Put bear first
    if (bearIndex !== -1) {
      if (backRowSize > 0) {
        backRowNames.push("Bear");
      } else {
        frontRowNames.push("Bear");
      }
    }

    // Put largo next
    if (largoIndex !== -1) {
      if (backRowSize > 0) {
        backRowNames.push("Largathon");
      } else {
        frontRowNames.push("Largathon");
      }
    }

    // Put Migg next
    if (miggIndex !== -1) {
      if (frontRowSize > 0) {
        frontRowNames.push("Migg Mouse");
      } else {
        backRowNames.push("Migg Mouse");
      }
    }

    // Put in the rest of the names
    for (let i = 0; i < this.ratNames.length; i++) {
      let currName = this.ratNames[i];
      if (
        !(
          currName === "Migg Mouse" ||
          currName === "Largathon" ||
          currName === "Bear"
        )
      ) {
        // Fill up the rows according to the number of contestants
        if (backRowNames.length === backRowSize) {
          frontRowNames.push(currName);
        } else {
          backRowNames.push(currName);
        }
      }
    }

    // Reverse the rows
    frontRowNames.reverse();
    backRowNames.reverse();

    // Get all of the round's rats based on their names
    this.activeRats = this.ratNames.map((ratName) =>
      this.props.getRatByName(ratName)
    );
    this.frontRowRats = frontRowNames.map((ratName) =>
      this.props.getRatByName(ratName)
    );
    this.backRowRats = backRowNames.map((ratName) =>
      this.props.getRatByName(ratName)
    );
  }

  updateInstructions() {
    this.setState({ allRatsSelectedClass: "" });
    let ratsLeft = this.props.numRoses - this.state.selectedRats.length;
    if (ratsLeft > 1) {
      this.setState({ instructions: `Choose ${ratsLeft} more contestants` });
    } else {
      this.setState({ instructions: `Choose ${ratsLeft} more contestant` });
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
      this.props.playTap();
      this.setState({ selectedRats: newSelectedRats });
      element.classList.remove("selectedRat");
      this.updateInstructions();
      return;
    }

    // If you've already selected the max rats, you can't select another
    if (this.state.selectedRats.length === this.numRoses) {
      this.props.playBadActionSound();
      return;
    }

    // Otherwise, select this rat
    let newSelectedRats = this.state.selectedRats;
    newSelectedRats.push(ratName);
    element.classList.add("selectedRat");
    this.props.playTap();

    // If that was the final rat, display the advance button
    if (this.state.selectedRats.length === this.numRoses) {
      let giveRosesButton;
      if (this.numRoses === 1) {
        this.finalRat = this.props.getRatByName(this.state.selectedRats[0]);
        giveRosesButton = (
          <button onClick={this.endRoseCeremony.bind(this)}>
            Propose to {this.state.selectedRats[0]}
          </button>
        );
      } else {
        giveRosesButton = (
          <button onClick={this.endRoseCeremony.bind(this)}>
            Continue Finding Love
          </button>
        );
      }
      this.setState({ instructions: giveRosesButton });
      this.setState({ allRatsSelectedClass: "allRatsSelected" });
    } else {
      this.updateInstructions();
    }

    // Force a UI update for the rat list
    this.setState({});
  }

  endRoseCeremony() {
    this.props.setActiveRatsAndAdvanceState(this.state.selectedRats);
  }

  render() {
    let backRatsList = [];
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.backRowRats.length; i++) {
      let filename = `/ratchelor/img/Characters/${this.backRowRats[i].filename}.png`;
      let roseFilename = `/ratchelor/img/Characters/roses/${this.backRowRats[i].filename}.png`;
      backRatsList.push(
        
        <div
          key={i}
          id={`rat${i}`}
          className={`ratList`}
          onClick={() => {
            this.selectRat(this.backRowRats[i].name, `rat${i}`);
          }}
        >
          <div className={`${this.state.allRatsSelectedClass}`}>
          {/* {`${this.backRowRats[i].name}`} */}
          <img
            className={`ratPic  ${this.backRowRats[i].size}`}
            src={filename}
            alt="a rat waiting for you to make a decision"
          />
           <img
            className={`ratPic ratWithRosePic  ${this.backRowRats[i].size}`}
            src={roseFilename}
            alt="a rat waiting for you to make a decision"
          />
          <div className="hoverText" alt="info about the rat">
            {this.backRowRats[i].name}
          </div></div>
        </div>
      );
    }
    let frontRatsList = [];
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.frontRowRats.length; i++) {
      let filename = `/ratchelor/img/Characters/${this.frontRowRats[i].filename}.png`;
      let roseFilename = `/ratchelor/img/Characters/roses/${this.frontRowRats[i].filename}.png`;

      frontRatsList.push(
        <div
          key={i}
          id={`rat${this.backRowRats.length + i}`}
          className={`ratList`}
          onClick={() => {
            this.selectRat(
              this.frontRowRats[i].name,
              `rat${this.backRowRats.length + i}`
            );
          }}
        >
           <div className={`${this.state.allRatsSelectedClass}`}>
          {/* {`${this.frontRowRats[i].name}`} */}
          <img
            className={`ratPic ${this.frontRowRats[i].size}`}
            src={filename}
            alt="a rat waiting for you to make a decision"
          />
          <img
            className={`ratPic ratWithRosePic ${this.frontRowRats[i].size}`}
            src={roseFilename}
            alt="a rat waiting for you to make a decision"
          />
          <div className="hoverText" alt="info about the rat">
            {this.frontRowRats[i].name}
          </div>
          </div>
        </div>
      );
    }

    let bouquetNum = this.props.numRoses - this.state.selectedRats.length;
    if (!bouquetNum || bouquetNum < 0 || bouquetNum > 5) bouquetNum = 0;

    return (
      <div id="roseCeremonyScreen" className={`screen ${this.state.lastRoseClass}`}>
        <img
          id="bouquet"
          alt="a rose bouquet"
          src={`/ratchelor/img/Bouquet/bouquet${bouquetNum}.png`}
        ></img>
        <div id="instructions">{this.state.instructions}</div>
        <div id="ratListContainer">
          <div id="backRow" className={`${this.state.middleRowClass}`}>
            {backRatsList}
          </div>
          <div id="frontRow">{frontRatsList}</div>
        </div>
      </div>
    );
  }
}

export default RoseCeremony;
