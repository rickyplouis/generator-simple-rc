var React = require('react');
var createReactClass = require('create-react-class');

var <%= componentName %> = createReactClass({<% if(jsx){ %>
  render: function() {
    return <div>{this.state.text}</div>;
  }
});

module.exports = <%= componentName %>;<% } else{ %>
  render: function() {
    return React.createElement('div', null, this.state.text);
  }
});

module.exports = <%= componentName %>;<% } %>
