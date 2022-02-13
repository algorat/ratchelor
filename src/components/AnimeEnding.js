import React from "react";
import MobileWrapper from "./MobileWrapper";

class AnimeEnding extends React.Component {
  render() {
    return (
      <>
        <div id="animeEndingScreen" className="screen">
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
        {this.props.isOnMobile && (
          <MobileWrapper
            controlsStyled={true}
            bodyId={"anime-ending"}
            cta={
              <button id="epilogueButton" onClick={this.props.epilogue}>
                Epilogue
              </button>
            }
          >
            <p>
              {
                this.props.winningRat.dialogue[
                  this.props.winningRat.dialogue.length - 1
                ]
              }
            </p>
          </MobileWrapper>
        )}
      </>
    );
  }
}

export default AnimeEnding;
