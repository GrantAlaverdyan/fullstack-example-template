const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const pg = require("pg");

const config = {
  user: process.env.USERDB,
  database: "",
  password: process.env.PASSDB,
  port: 5432,
};

const pool = new pg.Pool(config);

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join("../", "client/build")));
const userDB = process.env.USERDB;
app.get("/check", function (req, res) {
  res.json({ response: "work" });
});

app.get("/checkDB", function (req, res) {
  pool.connect(function (err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }

    client.query(`SELECT * from users;`, function (err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).json({ response: "success" });
    });
  });
});

app.listen(5000, console.log("Сервер успешно запущен на порту 3000"));
