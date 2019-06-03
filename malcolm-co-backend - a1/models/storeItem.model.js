

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StoreItemSchema = new Schema({
    price: {type: Number, required: true},
    id: {type: Number, required: true},
    quantity: {type: Number, required: true},
    name: {type: String, required: true, max: 100},
    description: String,
    imageLink: String,
    avaliable: Boolean
});

// Export the model
module.exports = mongoose.model('StoreItem', StoreItemSchema);