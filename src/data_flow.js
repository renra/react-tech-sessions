var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery');

var data = [
  {
    id: '1',
    name: 'Leonardo',
    weapon: 'Two Swords'
  },
  {
    id: '2',
    name: 'Raffaelo',
    weapon: 'Sai'
  },
  {
    id: '3',
    name: 'Donatello',
    weapon: 'Bo Staff'
  },
  {
    id: '4',
    name: 'Michelangelo',
    weapon: 'Nunchaku'
  }
]

var NinjaTurtles = React.createClass({
  getInitialState: function(){
    return({data: data});
  },

  editRow: function(e){
    var id = $(e.target).data('id');
    this.setState({id: id});
  },

  handleUpdate: function(updatedTurtle){
    var data = this.state.data;
    var idx = data.findIndex(function(turtle){
      return turtle.id == updatedTurtle.id;
    });

    if(idx === -1) return;

    data[idx] = updatedTurtle;
    this.setState({data: data});
  },

  render: function(){
    return(
      <div>
        <Table data={this.state.data} editRow={this.editRow} />
        <hr />
        <Form id={this.state.id} handleUpdate={this.handleUpdate}/>
      </div>
    );
  }
});

var Table = React.createClass({
  render: function(){
    var self = this;

    var rows = this.props.data.map(function(row){
      var href = '#' + row.id

      return(
        <tr key={row.id}>
          <td>{row.id}</td>
          <td><a href={href} data-id={row.id} onClick={self.props.editRow}>{row.name}</a></td>
          <td>{row.weapon}</td>
        </tr>
      );
    });

    return(
      <table>
        <thead>
          <tr>
            <th>
              Id
            </th>
            <th>
              Name
            </th>
            <th>
              Weapon of Choice
            </th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
});

var Form = React.createClass({
  getInitialState: function(){
    console.log(this.props.id);
    return({});
  },

  handleNameChange: function(e){
    this.setState({name: e.target.value})
  },

  handleWeaponChange: function(e){
    this.setState({weapon: e.target.value})
  },

  componentWillReceiveProps: function(newProps){
    var turtle = data.find(function(turtle){
      return turtle.id == newProps.id
    });

    if(!turtle) return;

    this.setState({name: turtle.name, weapon: turtle.weapon});
  },

  handleButtonClick: function(){
    var name = this.state.name.trim();
    var weapon = this.state.weapon.trim();

    this.props.handleUpdate({id: this.props.id, name: name, weapon: weapon});
  },

  render: function(){
    return(
      <div>
        <div>
          <span>Name: </span>
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleNameChange}
          />
        </div>

        <div>
          <span>Weapon: </span>
          <input
            type="text"
            value={this.state.weapon}
            onChange={this.handleWeaponChange}
          />
        </div>

        <div>
          <button onClick={this.handleButtonClick}>Update</button>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <NinjaTurtles />,
  document.getElementById('example')
);
