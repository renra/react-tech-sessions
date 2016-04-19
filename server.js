var http = require('http'),
  port = 9000;


var tableData = [
  { english: 'Water', spanish: 'Agua' },
  { english: 'Beer', spanish: 'Cerveza' },
  { english: 'Wine', spanish: 'Vino' }
]

http.createServer(function (req, res) {
  if(req.url.match(/table_data/)){
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    res.end(JSON.stringify(tableData));
  }
  else {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    });

    res.end('');
  }
}).listen(port);

console.log('Listening on ' + port);
