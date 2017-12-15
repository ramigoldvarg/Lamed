const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('express-formidable');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const routes = require('./server/routes/index.js');
const app = express();
 
const compiler = webpack(webpackConfig);
 
app.use(express.static(__dirname + '/www'));
app.use('/images', express.static(__dirname + '/images'));
app.use(formidable());
app.use(bodyParser.json());
app.use(routes);
app.use('/tiny', express.static(__dirname + '/TinyMCE'))

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));
 
const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});