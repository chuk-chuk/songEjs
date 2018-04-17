const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const url = 'http://www.songsterr.com/a/ra/songs.json?pattern=Marley';

app.set('view engine', 'ejs');

const fetchData = () => {
  return fetch(url).then((response) => {
    if(response.ok) {
      return response.json()
    } else {
      console.log('Network request for artists failed with response ' + response.status + ': ' + response.statusText);
    }
  });
}

const prepareDataToRender = (data) => {
  const listOfRecords = data.map((record) => {
    return {
      title:record.title,
      chords:record.chordsPresent
    }
  });
  return listOfRecords;
}

app.get('/', (req, res, next) => {
  fetchData()
    .then(prepareDataToRender)
    .then((listOfRecords) => {
      res.render('index', {
        records: listOfRecords
      });
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(port, () => console.log('Node.js listening on port ' + port));
