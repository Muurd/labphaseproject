const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controllers");
const authMiddleware = require("../middlewares/Auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", authMiddleware, userController.getUser);
router.put('/profile',authMiddleware,userController.updateUserProfile)
router.put('/cart/quantity',authMiddleware,userController.updateCartQuantity)
router.post('/send-email',authMiddleware,userController.sendEmail)
module.exports = router;