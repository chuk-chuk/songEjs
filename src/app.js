const fetch = require('node-fetch');
const url = 'http://www.songsterr.com/a/ra/songs.json?pattern=';

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

module.exports = {
  fetchData,
  prepareDataToRender
};
