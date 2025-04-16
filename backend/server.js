const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 5000;
const authRoutes = require('./routes/Auth.routes');
require('dotenv').config()
const productRoutes = require('./routes/Product.routes')
const OrderRoutes = require('./routes/Order.routes')
const path = require('path');


app.use(express.json())
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes)
app.use('/api/orders',OrderRoutes)
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('connection to MongoDb is succesful'))
    .catch(() => console.log('Error,Failed to connect to the database'))

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

process.on('SIGINT', () => {
    console.log("Shutting down the server");
    mongoose.connection.close(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
    });
});