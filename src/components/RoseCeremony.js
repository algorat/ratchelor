import React from "react";
import MobileWrapper from "./MobileWrapper";
import arrow from "../img/arrow-500.png";

const roseSuffix = '-rose.png'
const roseSadSuffix = '-sad.png'


class RoseCeremony extends React.Component {
  constructor(props) {
    super(props);

    // How many roses you have to give out
    this.numRoses = this.props.numRoses;

    this.activeRats = [];
    this.backRowRats = [];
    this.frontRowRats = [];
    this.roundNum = props.roundNum;

    this.state = {
      selectedRats: [],
      deselectedRats: [],
      giveRosesButton: "",
      instructions: `Choose ${this.props.numRoses} to continue`,
      middleRowClass: "",
      allRatsSelectedClass: "notAllRatsSelected",
      lastRoseClass: "",
      currentlyViewedRat: [null, null],
    };
  }

  componentDidMount() {
    if (this.props.numRoses === 1) {
      this.setState({
        instructions: `Choose your soulmate`,
        lastRoseClass: "lastRose",
      });
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
    } else if (ratsLeft === 1) {
      this.setState({ instructions: `Choose ${ratsLeft} more contestant` });
    }
  }

  selectRatIntermediate(ratName, id) {
    this.setState({ currentlyViewedRat: [ratName, id] });
  }

  // When a rat is clicked
  selectRat(ratName, id) {
    console.log(ratName, id)
    // Get the element for the current rat button
    const element = document.getElementById(id);

    // If it's already chosen, deselect it
    if (this.state.selectedRats.indexOf(ratName) !== -1) {
      let newdeSelectedRats = this.state.deselectedRats;
      newdeSelectedRats.push(ratName);
      element.classList.add("deselectedRat");

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
    // check if it was sad and remove that pic if it was sad
    if (this.state.deselectedRats.indexOf(ratName) !== -1) {
      const index = this.state.deselectedRats.indexOf(ratName);
      const newdeSelectedRats = this.state.deselectedRats;
      newdeSelectedRats.splice(index, 1);
      this.setState({ deselectedRats: newdeSelectedRats });
      element.classList.remove("deselectedRat");
    }

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

      if (!this.props.isOnMobile) {
        this.setState({ instructions: giveRosesButton });
      } else {
        this.setState({ instructions: "You're done!" });
      }

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
      const activeRat = this.backRowRats[i];
      const baseName = activeRat.filename;
      let filename = `/ratchelor/img/Characters/${baseName}.png`;
      let roseFilename = `/ratchelor/img/Characters/${baseName}${roseSuffix}`;
      let sadFilename = `/ratchelor/img/Characters/${baseName}${roseSadSuffix}`;

      if (activeRat.rose_ceremony_filename && this.roundNum < activeRat.rose_ceremony_filename.length) {
        const baseFilename = activeRat.rose_ceremony_filename[this.roundNum];
        filename = `/ratchelor/img/Characters/${baseFilename}.png`;
        roseFilename = `/ratchelor/img/Characters/${baseFilename}${roseSuffix}`;
        sadFilename = `/ratchelor/img/Characters/${baseFilename}${roseSadSuffix}`;
      }
      backRatsList.push(
        <div
          key={i}
          id={`rat${i}`}
          className={`ratList`}
          onClick={() => {
            if (this.props.isOnMobile) {
              this.selectRatIntermediate(this.backRowRats[i].name, `rat${i}`);
            } else {
              this.selectRat(this.backRowRats[i].name, `rat${i}`);
            }
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
            <img
              className={`ratPic sadRatPic  ${this.backRowRats[i].size}`}
              src={sadFilename}
              alt="a sad rat"
            />
            {!this.props.isOnMobile && (
              <div className="hoverText" alt="info about the rat">
                {this.backRowRats[i].name}
              </div>
            )}
            {(this.props.isOnMobile && 
              this.state.currentlyViewedRat[0] === this.backRowRats[i].name) 
              && (
              <img 
                className="roseCeremonySelectedArrow"
                src={arrow} 
                alt={"arrow pointing at the selected rat"} />
            )}
          </div>
        </div>
      );
    }
    let frontRatsList = [];
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.frontRowRats.length; i++) {
      const activeRat = this.frontRowRats[i];
      const baseName = activeRat.filename;
      let filename = `/ratchelor/img/Characters/${baseName}.png`;
      let roseFilename = `/ratchelor/img/Characters/${baseName}${roseSuffix}`;
      let sadFilename = `/ratchelor/img/Characters/${baseName}${roseSadSuffix}`;

      if (activeRat.rose_ceremony_filename && this.roundNum < activeRat.rose_ceremony_filename.length) {
        const baseFilename = activeRat.rose_ceremony_filename[this.roundNum];
        filename = `/ratchelor/img/Characters/${baseFilename}.png`;
        roseFilename = `/ratchelor/img/Characters/${baseFilename}${roseSuffix}`;
        sadFilename = `/ratchelor/img/Characters/${baseFilename}${roseSadSuffix}`;
      }

      frontRatsList.push(
        <div
          key={i}
          id={`rat${this.backRowRats.length + i}`}
          className={`ratList`}
          onClick={() => {
            if (this.props.isOnMobile) {
              this.selectRatIntermediate(
                this.frontRowRats[i].name,
                `rat${this.backRowRats.length + i}`
              );
            } else {
              this.selectRat(
                this.frontRowRats[i].name,
                `rat${this.backRowRats.length + i}`
              );
            }
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
            <img
              className={`ratPic sadRatPic  ${this.backRowRats[i].size}`}
              src={sadFilename}
              alt="a sad rat"
            />
            {!this.props.isOnMobile && (
              <div className="hoverText" alt="info about the rat">
                {this.frontRowRats[i].name}
              </div>
            )}
            {(this.props.isOnMobile && 
              this.state.currentlyViewedRat[0] === this.frontRowRats[i].name) 
              && (
              <img 
                className="roseCeremonySelectedArrow"
                src={arrow} 
                alt={"arrow pointing at the selected rat"} />
            )}
          </div>
        </div>
      );
    }

    let bouquetNum = this.props.numRoses - this.state.selectedRats.length;
    if (!bouquetNum || bouquetNum < 0 || bouquetNum > 5) bouquetNum = 0;
    const lastClickedRat = this.props.getRatByName(
      this.state.currentlyViewedRat[0]
    );

    const mobileButton = (
      <button
        className={
          this.state.selectedRats.length !== this.numRoses ? "unselect" : ""
        }
        onClick={this.endRoseCeremony.bind(this)}
      >
        {this.numRoses === 1 ? "Propose" : "Continue finding love"}
      </button>
    );

    return (
      <>
        <div
          id="roseCeremonyScreen"
          className={`screen ${this.state.lastRoseClass}`}
        >
          <img
            id="bouquet"
            alt="a rose bouquet"
            src={`${process.env.PUBLIC_URL}/img/Bouquet/bouquet${bouquetNum}.png`}
          ></img>
          {!this.props.isOnMobile && (
            <div id="instructions">{this.state.instructions}</div>
          )}
          <div id="ratListContainer">
            <div id="backRow" className={`${this.state.middleRowClass}`}>
              {backRatsList}
            </div>
            <div id="frontRow">{frontRatsList}</div>
          </div>
        </div>
        {this.props.isOnMobile &&
          (lastClickedRat === null || lastClickedRat === undefined ? (
            <MobileWrapper
              controlsStyled={true}
              header={this.state.instructions}
              cta={mobileButton}
            >
              <h2>Select a rat to get started</h2>
            </MobileWrapper>
          ) : (
            <MobileWrapper
              controlsStyled={true}
              header={this.state.instructions}
              cta={mobileButton}
            >
              <img className="roseCeremonyWidePortrait" src={`${process.env.PUBLIC_URL}/img/Wide/${lastClickedRat.filename}.png`}/>
              <h2>{this.state.currentlyViewedRat[0]}</h2>
              <button
                onClick={() => {
                  this.selectRat(...this.state.currentlyViewedRat);
                }}
                className={
                  this.state.selectedRats.length === this.numRoses &&
                  !this.state.selectedRats.includes(
                    this.state.currentlyViewedRat[0]
                  )
                    ? "unselect"
                    : ""
                }
              >
                {this.state.selectedRats.includes(
                  this.state.currentlyViewedRat[0]
                )
                  ? "Deselect"
                  : "Select"}
              </button>
            </MobileWrapper>
          ))}
      </>
    );
  }
}

export default RoseCeremony;
