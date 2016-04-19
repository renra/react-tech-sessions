var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery'),
  key = 0;

var Row = React.createClass({
  render: function() {
    return(
      <tr>
        <td>
          {this.props.english}
        </td>

        <td>
          {this.props.spanish}
        </td>
      </tr>
    )
  }
});

var Table = React.createClass({
  //getInitialState: function(){
  //  return { data: [] };
  //},

  //componentDidMount: function() {
  //  $.ajax({
  //    url: this.props.url,
  //    dataType: 'json',
  //    cache: false,
  //    success: function(data) {
  //      this.setState({data: data});   // Magic here
  //    }.bind(this),

  //    error: function(xhr, status, err) {
  //      console.error(this.props.url, status, err.toString());
  //    }.bind(this)
  //  });
  //},

  render: function() {
    var rows = this.props.data.map(function(row){
      return <Row key={key++} english={row.english} spanish={row.spanish} />;
    });

    return(
      <table>
        <thead>
          <tr>
            <th>
              English
            </th>
            <th>
              Spanish
            </th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

var data = [
  { english: 'One', spanish: 'Uno' },
  { english: 'Two', spanish: 'Dos' },
  { english: 'Three', spanish: 'Tres' }
];

ReactDOM.render(
  <Table data={data} />,
  //<Table url="http://localhost:9000/table_data" />,
  document.getElementById('example')
);
