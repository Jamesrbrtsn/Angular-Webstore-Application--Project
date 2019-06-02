const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    mongo = require('mongodb').MongoClient;

const url = 'mongodb://'

//Routes imports for models
const storeItem = require('./routes/storeItem.route');

const app = express();

//Model import
app.use('/storeItem', storeItem)



let port = process.env.PORT || 4000;

const server = app.listen(function () {
    console.log('Listening on port ' + port);
});