const routes = require('express').Router();
const pages = require('./pages/pages.js');

routes.use('/pages', pages);

module.exports = routes;