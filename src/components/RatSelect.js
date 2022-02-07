import React from "react";

class RatSelect extends React.Component {
  constructor(props) {
    super(props);

    // Once you've select the rats, advance to the next stage
    this.onClickSelectRats = () => {
      props.setActiveRatsAndAdvanceState(this.state.selectedRats);
    };

    this.isOnMobile = props.isOnMobile;

    this.state = {
      selectedRats: [],
      currentlyViewedRat: -1,
      selectRatsButton: <div id="chooseText">Select your 7 contestants</div>,
    };
  }

  noContestantsLeft() {
    let selectRatsButton = !this.isOnMobile ? (
      <div id="chooseText">
        <button
          onClick={() => {
            this.onClickSelectRats();
          }}
        >
          Continue
        </button>
      </div>
    ) : (
      "You're done!"
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

  selectRatIntermediate(ratName, id) {
    this.setState({ currentlyViewedRat: id });
  }

  // When a rat is clicked
  selectRat(ratName, id) {
    // Get the element for the current rat button
    const element = document.getElementById(id);

    // If it's already chosen, deselect it
    if (this.state.selectedRats.indexOf(ratName) !== -1) {
      this.props.playTap();
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
      this.props.playBadActionSound();
      return;
    }

    // Otherwise, select this rat
    let newSelectedRats = this.state.selectedRats;
    newSelectedRats.push(ratName);
    element.classList.add("selectedRat");

    this.props.playTap();

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
    const MobileWrapper = this.props.mobileMenuWrapper;
    let ratsList = [];
    // Create a clickable div for every rat in the game
    for (let i = 0; i < this.props.rats.length; i++) {
      let filename = `${process.env.PUBLIC_URL}/img/Frames/${this.props.rats[i].filename}.PNG`;
      let filenameHearts = `${process.env.PUBLIC_URL}/img/Frames/hearts${
        (i % 9) + 1
      }.PNG`;
      ratsList.push(
        <div key={"rats" + i} id="ratContainer">
          <div
            id={`rat${i}`}
            className="ratListItem"
            onClick={() => {
              if (this.props.isOnMobile) {
                this.selectRatIntermediate(this.props.rats[i].name, i);
              } else {
                this.selectRat(this.props.rats[i].name, `rat${i}`);
              }
            }}
          >
            <div className="ratPic">
              <img
                key={`ratframe${i}`}
                className="ratFrame"
                src={filename}
                alt=""
              />
              <img
                key={`rathearts${i}`}
                className="ratHearts"
                src={filenameHearts}
                alt=""
              />
            </div>
            {!this.props.isOnMobile && (
              <div className="ratNameContainer">
                <div className="ratName">{`${this.props.rats[i].name}`}</div>
                <div className="ratTagline">{`"${this.props.rats[i].tagline}"`}</div>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <>
        <div id="ratSelectScreen" className="screen">
          {!this.props.isOnMobile && this.state.selectRatsButton}
          <div id="ratListContainer" className="stillRats">
            {ratsList}
          </div>
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper>
            <div className="controls-wrapper">
              <div className="controls-wrapper__header">
                {this.state.selectRatsButton}
              </div>
              <div className="controls-wrapper__body">
                {this.state.currentlyViewedRat < 0 ? (
                  <div>Select a rat!</div>
                ) : (
                  <div id="mobile-container">
                    <h2>
                      {this.props.rats[this.state.currentlyViewedRat].name}
                    </h2>
                    <div className="row">
                      <p>
                        {this.props.rats[this.state.currentlyViewedRat].tagline}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        this.selectRat(
                          this.props.rats[this.state.currentlyViewedRat].name,
                          `rat${this.state.currentlyViewedRat}`
                        );
                      }}
                      className={
                        this.props.numRatsInGame ===
                          this.state.selectedRats.length &&
                        !this.state.selectedRats.includes(
                          this.props.rats[this.state.currentlyViewedRat].name
                        )
                          ? "unselect"
                          : ""
                      }
                    >
                      {this.state.selectedRats.includes(
                        this.props.rats[this.state.currentlyViewedRat].name
                      )
                        ? "Deselect"
                        : "Select"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div id="button-container">
              <button
                className={
                  this.props.numRatsInGame - this.state.selectedRats.length > 0
                    ? "unselect"
                    : ""
                }
                onClick={() => {
                  if (
                    this.props.numRatsInGame !== this.state.selectedRats.length
                  ) {
                    return;
                  }
                  this.onClickSelectRats();
                }}
              >
                Onwards
              </button>
            </div>
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default RatSelect;
