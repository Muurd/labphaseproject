import multer from 'multer';

const storage = multer.memoryStorage(); 

const upload = multer({
    storage: storage,
    limits: { fileSize: 1 * 1024 * 1024 }, 
}).single('img');
const LimitImageSize = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: 'File is too large. Max size is 1MB' });
        }
        next();
    });
};

export { LimitImageSize };