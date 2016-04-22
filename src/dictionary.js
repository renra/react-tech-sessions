var React = require('react'),
  ReactDOM = require('react-dom'),
  $ = require('jquery');

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

var EntryForm = React.createClass({
  getInitialState: function() {
    return({ ajax_in_progress: false, english: '', spanish: ''});
  },

  handleEnglishChange: function(e) {
    this.setState({english: e.target.value})
  },

  handleSpanishChange: function(e) {
    this.setState({spanish: e.target.value})
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var english = this.state.english.trim();
    var spanish = this.state.spanish.trim();

    if(english && spanish){
      $.ajax({
        url: 'http://localhost:9000/dictionary',
        method: 'POST',
        data: JSON.stringify({
          english: english,
          spanish: spanish
        }),
        dataType: 'json',
        contentType:"application/json; charset=utf-8",
        success: function() {
          this.props.onNewData();
        }.bind(this),
        complete: function(){
          this.setState({ajax_in_progress: false});
        }.bind(this)
      });

      this.setState({ajax_in_progress: true, english: '', spanish: ''});
    }
  },

  render: function() {
    return(
      <form>
        <input
          className="dictionary-entry"
          type="text"
          placeholder="English expression"
          value={this.state.english}
          disabled={this.state.ajax_in_progress}
          onChange={this.handleEnglishChange}
        />

        <input
          className="dictionary-entry"
          type="text"
          placeholder="Spanish expression"
          value={this.state.spanish}
          disabled={this.state.ajax_in_progress}
          onChange={this.handleSpanishChange}
        />

        <input
          type="submit"
          value="Add to Dictionary"
          disabled={this.state.ajax_in_progress}
          onClick={this.handleSubmit}
        />
      </form>
    );
  }
});

var Dictionary = React.createClass({
  getInitialState: function(){
    return { data: [] };
  },

  componentDidMount: function() {
    this.loadData();
  },

  loadData: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});   // Magic here
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var rows = this.state.data.map(function(row){
      return <Row key={row.id} english={row.english} spanish={row.spanish} />;
    });

    return(
      <div>
        <table className="dictionary">
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

        <EntryForm onNewData={this.loadData}/>
      </div>
    );
  }
});

ReactDOM.render(
  <Dictionary url="http://localhost:9000/dictionary" />,
  document.getElementById('example')
);
