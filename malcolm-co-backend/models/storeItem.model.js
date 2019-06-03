var mongoose = require('mongoose');
var storeItemSchema = mongoose.Schema(
    {
        price: Number,
        id: Number,
        quantity: Number,
        name: String,
        description: String,
        avaliable: Boolean

        //Future attributes
        //imageLink: String,
        //tax
        //rating
        //commentTree
    }
);
var StoreItems = mongoose.model('storeItem', storeItemSchema);
exports.Model = StoreItems;