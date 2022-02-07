import React from "react";

class AnimeEnding extends React.Component {
  render() {
    const MobileWrapper = this.props.mobileMenuWrapper;

    return (
      <>
        <div id="animeEndingScreen" className="screen">
          <div className="hide-overflow">
            <img
              id="animePic"
              src={`${process.env.PUBLIC_URL}/img/anime2/${this.props.winningRat.filename}.jpg`}
              alt="your chosen rat looking adoringly at you"
            ></img>
            {!this.props.isOnMobile && (
              <div id="animeText">
                {
                  this.props.winningRat.dialogue[
                    this.props.winningRat.dialogue.length - 1
                  ]
                }
              </div>
            )}
            {!this.props.isOnMobile && (
              <button id="epilogueButton" onClick={this.props.epilogue}>
                Epilogue
              </button>
            )}
          </div>
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper>
            <div className="controls-wrapper anime-ending">
              <p>
                {
                  this.props.winningRat.dialogue[
                    this.props.winningRat.dialogue.length - 1
                  ]
                }
              </p>
            </div>
            <div id="button-container">
              <button id="epilogueButton" onClick={this.props.epilogue}>
                Epilogue
              </button>
            </div>
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default AnimeEnding;
