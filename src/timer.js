var React = require('react');
var ReactDOM = require('react-dom');

var Timer = React.createClass({
  render: function() {
    return (
      <div>
        Hello, <input type="text" placeholder="Your name here" />!
        It is {this.props.date.toTimeString()}
      </div>
    );
  }
});

setInterval(function() {
  ReactDOM.render(
    <Timer date={new Date()} />,
    document.getElementById('example')
  );
}, 500);
