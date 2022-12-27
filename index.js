const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql');

require('dotenv').config()

// move to untracked .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

app.get('/', (req, res) => {
  let month = new Date().getMonth();
  // let year = new Date().getFullYear();
  let year = 2017;

  connection.query(
      "SELECT sum(iznos) as suma FROM trosak WHERE month(datum) = " +month +" AND year(datum) = "+year+" "
      , function (error, results, fields) {
        if (error) throw error;
        res.send(results)
      });
})

app.get('/unosi', (req, res) => {
  connection.query(
      "SELECT datum, iznos, komentar FROM trosak limit 10"
      , function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results))
      });
})

app.get('/raspored', (req, res) => {
  connection.query(
      "SELECT * FROM raspored where visible = 1"
      , function (error, results, fields) {
        if (error) throw error;
        res.send(JSON.stringify(results))
      });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
