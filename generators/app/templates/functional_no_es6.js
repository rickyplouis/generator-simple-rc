var React = require('react');
var ReactDOM = require('react-dom');
<% if(jsx){ %>
  function Welcome(props) {
    return <h1>Hello from, {props.title}</h1>;
  }
<% } else{ %>
  function Welcome(props) {
    return React.createElement(
      'h1',
      null,
      'Hello from, ',
      props.title
    );
  }
<% } %>
<% if(jsx){ %>
  function <%= componentName %>() {
    return (
      <div>
        <Welcome title="<%= componentName %>" />
      </div>
    );
  }
   <% } else{ %>
   function <%= componentName %>() {
     return React.createElement(
       'div',
       null,
       React.createElement(Welcome, { title: '<%= componentName %>' })
     );
   }
<% } %>
<% if(jsx){ %>
ReactDOM.render(
  <<%= componentName %> />,
  document.getElementById('root')
);
 <% } else{ %>
ReactDOM.render(
  React.createElement(<%= componentName %>, null),
  document.getElementById('root')
);
<% } %>
