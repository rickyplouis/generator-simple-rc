import React from 'react';

export default class <%= componentName %> extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: 'Hello from <%= componentName %>'
    }
  }

  render(){
    return (
      <div>{this.state.text}</div>
    )
  }
}
