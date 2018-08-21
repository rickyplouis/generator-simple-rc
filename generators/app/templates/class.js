import React from 'react';

export default class <%= componentName %> extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from state"
    }
  }

  render(){
    return (
      <div>{this.state.text}</div>
    )
  }
}
