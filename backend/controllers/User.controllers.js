const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer')
const register = async (req, res) => {
  try {
    const { Name, email, password } = req.body;
    if (!Name || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      Name,
      email,
      password: hashedPassword,
      img: ''
    });
    await user.save();
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }


    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .json({
        userId: user._id,
        Name: user.Name,
        token,
        message: "User logged in successfully",
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      Name: user.Name,
      email: user.email,
      role: user.role,
      img: user.img,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Error in getUser:', error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

  
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.body.img) {
      user.img = req.body.img;
    }
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully!',
      user,
    });
  } catch (error) {
    console.error('Error in updateUserProfile:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user.userId
    const { productId, quantity } = req.body;
    if (!userId || !productId || quantity < 1) {
      return res.status(400).json({ message: 'Invalid request' });
    }
    const user = await User.findById(userId)
    const cartItem = user.cart.find(item => item.productId.toString() === productId)
    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
    cartItem.quantity = quantity
    await user.save()
    return res.status(200).json({ message: 'Quantity updated', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
const sendEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.Email,
      pass: process.env.password,
    },
  });

  const formattedMessage = message.replace(/(?:\r\n|\r|\n)/g, '<br>');
  
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.Email, 
    subject: subject,
    text: message,
    html: `<p>${formattedMessage}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};
module.exports = { register, login, getUser, updateUserProfile, updateCartQuantity, sendEmail}