import React from "react";

class AnimeEnding extends React.Component {
  render() {
    const MobileWrapper = this.props.mobileMenuWrapper;

    return (
      <div id="animeEndingScreen" className="screen">
        <div className="hide-overflow">
        <img
          id="animePic"
          src={`/ratchelor/img/anime2/${this.props.winningRat.filename}.jpg`}
          alt="your chosen rat looking adoringly at you"
        ></img>
        {!this.props.isOnMobile &&
        <div id="animeText">
          {
            this.props.winningRat.dialogue[
              this.props.winningRat.dialogue.length - 1
            ]
          }
        </div>}
        {!this.props.isOnMobile 
          && <button id="epilogueButton" onClick={this.props.epilogue}>
            Epilogue
          </button>}
        </div>
        {this.props.isOnMobile && (
          <MobileWrapper>
            {
              this.props.winningRat.dialogue[
                this.props.winningRat.dialogue.length - 1
              ]
            }
            <button id="epilogueButton" onClick={this.props.epilogue}>
            Epilogue
          </button>
          </MobileWrapper>
        )}
      </div>
    );
  }
}

export default AnimeEnding;
