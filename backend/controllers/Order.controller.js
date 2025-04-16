const Order = require('../models/Order.model');
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const AddnewOrder = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    const userId = decoded.userId;
    if (!userId) {
      return res.status(400).json({ message: 'userId not found in token' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { firstName, lastName, address, city, state, zip, cardName, cardNumber, totalAmount } = req.body;
    const calculatedTotalAmount = totalAmount ? parseFloat(totalAmount) : user.cart.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
    }, 0);

    if (isNaN(calculatedTotalAmount) || calculatedTotalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid totalAmount' });
    }
    const newOrder = new Order({
      userId,
      items: user.cart,
      shippingAddress: { firstName, lastName, address, city, state, zip },
      totalAmount: calculatedTotalAmount,
      paymentMethod: 'Credit Card',
      paymentStatus: 'pending',
      cardDetails: { cardName, cardNumber },
    });

    await newOrder.save();
    user.cart = [];
    await user.save();

    return res.status(200).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to place the order', error: error.message });
  }
}
const getAllOrders = async (req, res) => {
  try {
    const allorders = await Order.find().sort({ createdAt: 1 }).populate('items.productId', 'price');
    if (allorders.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ allorders })
  } catch (error) {
    res.status(500).json({ message: "server error" })
  }
}
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(orderId, { paymentStatus }, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
const getOrderBasedOnUser = async (req, res) => {
  try {

    const orders = await Order.find({ userId: req.user.userId }).populate('items.productId', 'price ProductName img color');;

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.json({ allorders: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error fetching orders' });
  }
}
const getTotalOrder = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total orders' });
  }
}
const getTotalRevenue = async (req, res) => {
  try {
    const allOrders = await Order.find(); 
    const totalRevenue = allOrders.reduce((acc, order) => acc + order.totalAmount, 0);

    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching total revenue' });
  }
}

module.exports = { AddnewOrder, getAllOrders, updateOrderStatus, getOrderBasedOnUser, getTotalOrder, getTotalRevenue }