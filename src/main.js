var React = require('react');
var ReactDOM = require('react-dom');

var MessageBox = React.createClass({
  render: function(){
    return <div>{this.props.children}</div>;
  }
});

ReactDOM.render(
  <MessageBox>Hello World!
    <MessageBox>From React</MessageBox>
    <MessageBox>Really</MessageBox>
  </MessageBox>,
  document.getElementById('example')
);
