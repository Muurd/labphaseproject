const mongoose = require('mongoose')

const ProductsSchema = new mongoose.Schema({
    ProductName: {type: String},
    color: {type: String},
    price: {type: Number},
    category:{type: String},
    gender:{type: String},
    size:{type: String},
    img: {type: String},
    description: {type: String}
},{timestamps: true});

module.exports = mongoose.model('Products',ProductsSchema)