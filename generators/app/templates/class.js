import React from 'react';

export default class <%= componentName %> extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello from <%= componentName %>'
    };
  }
<% if(jsx){ %>
  render() {
    return (
      <div>
        {this.state.text}
      </div>
    );
  }
}
<% } else{ %>
   render() {
     return React.createElement(
       'div',
       null,
       this.state.text
     );
   }
 }
<% } %>
