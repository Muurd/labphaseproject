const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' }, quantity: Number }],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true }, 
  paymentStatus: { type: String, required: true, default: 'pending' },
  cardDetails: {
    cardName: { type: String, required: true },
    cardNumber: { type: String, required: true }
  },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
