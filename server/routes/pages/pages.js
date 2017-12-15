var models = require('express').Router();
const images = require('../images/images.js');
const pages = require('../../Db/page.js');

models.use("/images", images);

models.post('/', (req, res) => {
    pages.addNewObject(req.fields, (data) => {
        res.status(200).json(data);
    });
})

module.exports = models;