var http = require('http'),
  port = 9000,
  bodyParser = require('body-parser')
  nextId = 1;


var dictionary = []

function addToDictionary(entry){
  dictionary.push({id: nextId++, english: entry.english, spanish: entry.spanish});
}

addToDictionary({ english: 'Water', spanish: 'Agua' });
addToDictionary({ english: 'Beer', spanish: 'Cerveza' });
addToDictionary({ english: 'Wine', spanish: 'Vino' });

http.createServer(function (req, res) {
  if(req.url.match(/dictionary/)){
    if(req.method == 'POST'){
      var body = '';

      req.addListener('data', function(chunk){
        body += chunk;
      });

      req.addListener('end', function(chunk){
        if(body) {
          var entry = JSON.parse(body);

          // Validations
          if(entry.english && entry.spanish) {
            addToDictionary(entry);

            res.writeHead(204, {
              'Access-Control-Allow-Origin': '*'
            });

            res.end();
          }
          else {
            res.writeHead(422, {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            });

            res.end(JSON.stringify({errors: 'Things went wrong'}));
          }
        }
      });
    }
    else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      });

      res.end(JSON.stringify(dictionary));
    }
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
