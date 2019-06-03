

//Intitials
const express = require('express');
var bodyParser = require('body-parser');
const app = express();


//Model references
var StoreItems = require("./models/storeItem.model");




//Parser for objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongoose / mongodb setup and connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://wookieCoookie:media628bawdvwa62v@ds263146.mlab.com:63146/webstore-project';
mongoose.connect(mongoDB, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB conneciton error:'));

var PORT = 3000;

//Set up express router for route organization
var router = express.Router(); //get instance of express router
router.use(function(req, res, next) {
    console.log('router used');
    next(); //make sure we continue to the next routes
});


///////////////////////////////////////////////////////////////////////////////////////////
//=======================================================================================//
//=                          ROUTES                                                     =//
//=======================================================================================//
///////////////////////////////////////////////////////////////////////////////////////////


//====================Store Items
router.route('/items')  // GET, POST
    .post(function(req,res){  //creates a new store item
        var item = new StoreItems.Model(req.body);
        item.id = req.body.id;
        //price: { type: Number, required: true },
        item.price = Number(req.body.price);
        //id: { type: Number, required: true },
        item.id = Number(req.body.id);
        //quantity: { type: Number, required: true },
        item.quantity = Number(req.body.quantity);
        //name: { type: String, required: true, max: 100 },
        item.name = req.body.name;
        //description: String,
        item.description = req.body.description;
        //avaliable: Boolean
        item.avaliable = req.body.avaliable;
        item.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message: 'New Store Item created'});
        });
    })
    .get(function(req,res){ //returns all store items
        StoreItems.Model.find(function(err,storeItems){
            if(err){
                res.send(err);
            }
            res.json(storeItems)
        });
    });

router.route('/items/:id') //GET, PUT, DELETE
    .get(function(req,res){
        StoreItems.Model.findById(req.params.id, function(err,item){
            if(err){
                res.send(err);
            }
            res.json(item);
        })
    })
    .put(function(req, res){
        //price: { type: Number, required: true },
        //id: { type: Number, required: true },
        //quantity: { type: Number, required: true },
        //name: { type: String, required: true, max: 100 },
        //description: String,
        //avaliable: Boolean
        StoreItems.Model.findById(req.params.id, function(err, item){
            if(err){res.send(err);}
            if(req.body.name){ item.name = req.body.name; }
            if(req.body.price){ item.price = req.body.price; }
            if(req.body.id){ item.id = req.body.id; }
            if(req.body.quantity){ item.quantity = req.body.quantity; }
            if(req.body.description){ item.description = req.body.description; }
            if(req.body.avaliable){ item.avaliable = req.body.avaliable; }
            item.save(function(err){
                if(err){ res.send(err); }
                res.json({message: 'Item updated'});
            });
        });
    })
    .delete(function(req,res){
        StoreItems.Model.remove({
            _id: req.params.id
        }, function(err, item){
            if(err){
                res.send(err);
            }
            res.send({message: 'Successfully deleted requested item'})
        });
    });

//Specialty Get
router.route('/items/quantity/avaliable') //only return items marked avaliable, and that have quantity
    .get(function(req,res){
        StoreItems.Model.find(function(err, storeItems){
            if(err){
                res.send(err);
            }
            let avaliableAndQuantity = [];
            for(let index=0; index<storeItems.length; index++){
                if(storeItems[index]["avaliable"]==true){
                    if(storeItems[index]["quantity"] > 0){
                        avaliableAndQuantity.push(storeItems[index]);
                    }
                }
            }
            res.json(avaliableAndQuantity);
        });
    });

router.route('items/quantity/:id') //for quick quanity checks on specific items
    .get(function (req, res){
        StoreItems.Model.findById(req.params.id, function(err, item){
            if(err){ res.send(err); }
            res.json(item["quantity"]);
        });
    });

//Policies==================

//Accounts==================



///////////////////////////////////////////////////////////////////////////////////////////
//=======================================================================================//
//=                          App Start                                                  =//
//=======================================================================================//
///////////////////////////////////////////////////////////////////////////////////////////

app.use('/api', router);

app.listen(PORT, function() {
    console.log(`listening on ${PORT}`)
  })