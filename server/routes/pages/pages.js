var models = require('express').Router();
const images = require('../images/images.js');

models.use("/images", images);


module.exports = models;