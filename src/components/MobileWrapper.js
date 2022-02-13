import React from "react";

class Proposal extends React.Component {
  render() {
    const children = this.props.children;
    if (this.props.controlsStyled) {
      return (
        <div className="mobile-wrapper">
          <div className="controls-wrapper">
            {this.props.header && (
              <div className="controls-wrapper__header">
                {this.props.header}
              </div>
            )}
            <div
              id={this.props.bodyId}
              className={`controls-wrapper__body controls-wrapper__body--${
                this.props.row ? "row" : "col"
              }`}
            >
              {this.props.children}
            </div>
          </div>
          {this.props.cta && <div id="button-container">{this.props.cta}</div>}
        </div>
      );
    }
    return <div className="mobile-wrapper">{children}</div>;
  }
}

export default Proposal;
