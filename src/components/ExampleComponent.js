import React from "react";
import { Row, Box } from "jsxstyle";

function ExampleHooks(props) {
  return (
    <Row width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box>Hello world! I'm an example component.</Box>
    </Row>
  );
}

class ExampleComponent extends React.Component {
  render() {
    return (
      <Row
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box>Hello world! I'm an example component.</Box>
      </Row>
    );
  }
}

export default ExampleHooks;
