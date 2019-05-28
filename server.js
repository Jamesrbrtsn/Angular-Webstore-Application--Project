
//------------------
//  Dependencies
//------------------

//Modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
// Convig
const config = require('./server/config');

//MongoDB
mongoose.connect(config.MONGO_URI);
const monDB = mongoose.connection;

monDB.on('error', function(){
    console.error('MongoDB Connection Error. Please make sure that', config.MONGO_URI, 'is running.');
});
monDB.once('open', function callback(){
    console.info('Connected to MongoDB:',config.MONGO_URI);
});

//App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cors());

//Set port
const port = process.env.PORT || '8083';
app.set('port',port);

//Set static path to Angular app in dist
//Don't run in dev
if (process.env.NODE_ENV !== 'dev') {
    app.use('/', express.static(path.join(__dirname, './dist')));
}

//Routes
require('./server/api')(app,config);

//pass routing to Angular app
//don't run in dev
if(process.env.NODE_ENV !== 'dev'){
    app.get('*', function(req, res){
        res.sendFile(path.join(_dirname, '/dist/index.html'));
    });
}

//Server
app.listen(port,()=> console.log(`Server running on localhost: ${port}`));