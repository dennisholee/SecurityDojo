const express = require('express')
const mysql      = require('mysql');

const app = express()

var connection = mysql.createConnection({
  host     : '172.17.0.3',
  user     : 'appuser',
  password : 'password',
  database : 'myapp',
  insecureAuth: true
});
 
connection.connect();

app.get('/', (req, res) => {

  let name = req.query['id']

// connection.connect();
   
  connection.query('SELECT first_name FROM foo WHERE foo_id = ?', [name], function (error, results, fields) {
    if (error) throw error;
    //console.log('The solution is: ', JSON.stringify(results[0]));

    res.status(200).send(JSON.stringify(results[0]))
  });
   
// connection.end();

  // res.status(200).send('hello world')
})
app.listen(3000, () => console.log('Listening on port 3000'))
