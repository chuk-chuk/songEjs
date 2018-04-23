const ejs = require('ejs');
const bodyParser = require('body-parser');
const fetch = require("node-fetch");
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const url = 'http://www.songsterr.com/a/ra/songs.json?pattern=';

app.set('view engine', 'ejs');

const fetchData = (query) => {
  const urlToGet = `${url}${query}`
  return fetch(urlToGet).then((response) => {
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

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/songs', (req, res) => {
  const query = req.query.pattern
  fetchData(query)
  .then(prepareDataToRender)
  .then((listOfRecords) => {
    res.render('partials/results', {
      records: listOfRecords
    });
  })
  .catch((err) => {
      console.log(err)
      res.render('error')
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log('Node.js listening on port ' + port));
