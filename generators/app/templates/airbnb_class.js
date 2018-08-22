import React, { Component } from 'react';

class <%= componentName %> extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello from <%= componentName %>',
    };
  }

  render() {
    const { text } = this.state;
    return (
      <div>
        {text}
      </div>
    );
  }
}

export default <%= componentName %>;
