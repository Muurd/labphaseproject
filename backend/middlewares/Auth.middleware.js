const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];  

    if (!token) {
        return res.status(401).json({ message: 'Access Denied, No Token Provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = { userId: decoded.userId }; 
        next(); 
    } catch (error) {
        return res.status(400).json({ message: 'Invalid or Expired Token' });
    }
};
