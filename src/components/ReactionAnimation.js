import React from "react";

class ReactionAnimation extends React.Component {
  render() {
    return (
      <div
        className="reaction-animation"
        style={{ left: `${this.props.left}%`, top: this.props.top + "%" }}
      >
        {Array(5)
          .fill(this.props.emote)
          .map((val, idx) => (
            <div
              key={"reaction-emote-" + (idx + 1)}
              className={"reaction-emote reaction-emote-" + (idx + 1)}
            >
              {val}
            </div>
          ))}
      </div>
    );
  }
}

export default ReactionAnimation;
