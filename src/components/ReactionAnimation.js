import React from "react";

class ReactionAnimation extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="reaction-animation">
        {Array(5)
          .fill(this.props.emote)
          .map((val, idx) => (
            <div className={"reaction-emote " + "reaction-emote-" + (idx + 1)}>
              {val}
            </div>
          ))}
      </div>
    );
  }
}

export default ReactionAnimation;
