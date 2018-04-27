const ejs = require('ejs');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');
const express = require('express');
const app = express();
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(require('./webpack/webpack-dev.config'));
const port = process.env.PORT || 8080;
const routes = require('./routes/config');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(routes);
app.use(sassMiddleware({
  src: __dirname + '/src/scss',
  dest: path.join(__dirname, 'public'),
  debug: true,
  outputStyle: 'compressed',
  maxAge: 0,
  prefix: '/public'
})
);
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware(compiler, {}));

app.listen(port, () => console.log('Node.js listening on port ' + port));
