const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name: {type: String, required: true},   
    email: {type: String, required: true , unique: true},
    password: { type: String, required: true },
    role: { type: String, default: 'Admin' },
    img:{type: String},
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }, 
        quantity: { type: Number, default: 1 }  
    }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);