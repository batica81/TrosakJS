const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');

// move to untracked .env
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'trosakuser',
  password: 'qwerty123',
  database: 'trosak01'
});

app.get('/', (req, res) => {

  let resData;

  // connection.query('SELECT * from trosak AS solution', function (error, results, fields) {
  //   if (error) throw error;
  //   resData = results[0]
  //   console.log('The solution is: ', results[0]);
  //   res.send(resData)
  // });

  let month = new Date().getMonth();
  let year = new Date().getFullYear();

  connection.query(
      "SELECT sum(iznos) FROM trosak WHERE month(datum) = " +month +" AND year(datum) = "+year"
      , function (error, results, fields) {
    if (error) throw error;
    resData = results[0]
    console.log('The solution is: ', results[0]);
    res.send(resData)
  });




})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



