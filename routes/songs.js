const fetchData = require('../src/app').fetchData;
const prepareDataToRender = require('../src/app').prepareDataToRender;

const songs = (req, res) => {
  const query = req.query.pattern
  fetchData(query)
  .then(prepareDataToRender)
  .then((listOfRecords) => {
    res.render('results', {
      records: listOfRecords
    });
  })
  .catch((err) => {
      console.log(err)
      res.render('error')
    })
};

module.exports = songs;
