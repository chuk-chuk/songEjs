const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
  res.render('index')
})

app.listen(port);
