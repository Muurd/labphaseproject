import Products from '../models/Product.model.js'; 
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import User from '../models/User.model.js'
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET, 
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('img'); 

const addProduct = async (req, res) => {
    const { ProductName, color, price, category, gender, size, img, description } = req.body;

    try {
        if (!ProductName || !color || !price || !category || !gender || !size || !img || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newProduct = new Products({
            ProductName,
            color,
            price,
            category,
            gender,
            size,
            img, 
            description
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully' });

    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ message: 'Error saving product' });
    }
};
const getAllProducts = async (req,res) => {
    try {
        const AllProducts = await Products.find()
        if (AllProducts.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({AllProducts});
    } catch (error) {
        res.status(500).json({ message: "Server error. Could not fetch products." });
    }
}
const getManProducts = async (req,res) => {
    try {
        const Menproducts = await Products.find({gender: "men"})
        if (Menproducts.length === 0){
            return res.status(404).json({message:"no men products found"})
        }
        res.status(200).json({Menproducts})
    } catch (error){
        res.status(500).json({message:"error,cant find men products"})
    }
}
const getWomenProducts = async (req,res) => {
    try {
        const Womenproducts = await Products.find({gender: "women"})
        if (Womenproducts.length === 0){
            return res.status(404).json({message:"no women products found"})
        }
        res.status(200).json({Womenproducts})
    } catch (error){
        res.status(500).json({message:"error,cant find women products"})
    }
}
const getSpecProduct = async (req,res) => {
    try {
        const { id } = req.params
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "Error retrieving product", error: error.message });
    }
}
const deleteProduct = async (req,res) => {
    try {
        const ProductId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(ProductId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        
        const result = await Products.deleteOne({_id: ProductId})
        if (result.deletedCount === 0) {
            return res.status(404).json({message:"Product not found"})
        }
        res.status(200).json({message:"product is deleted"})
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({message:"server error,could not delete product"})
    }
}
const updateProduct = async (req, res) => {
    const ProductId = req.params.id;
    const updated = req.body;
    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading image' });
        }

        let imageUrl = updated.img; 
       
        if (req.file) {
            try {
                const result = await cloudinary.uploader.upload(req.file.buffer, {
                    folder: 'products',
                    public_id: `${Date.now()}`, 
                });

                imageUrl = result.secure_url; 
            } catch (error) {
                return res.status(500).json({ message: 'Error uploading image to Cloudinary', error: error.message });
            }
        }

      
        const resultUpdate = await Products.findByIdAndUpdate(
            ProductId,
            { $set: { ...updated, img: imageUrl } }, 
            { new: true }
        );

        if (!resultUpdate) {
            return res.status(400).json({ message: "Sorry, can't update this product" });
        }

        res.status(200).json({ message: "Product updated successfully", product: resultUpdate });
    });
};
const addToCart = async (req,res) => {
    const { userId, productId, quantity } = req.body;
    try {
        const user = await User.findById(userId)
        if (!user) {
            return { status: 404, message: 'User not found' };
        }
        const productInCart = user.cart.find(item => item.productId.toString() === productId);
        if (productInCart) {
            productInCart.quantity += quantity || 1;
        } else {
            user.cart.push({productId,quantity})
        }
        await user.save()
        return { status: 200, message: 'Product added to cart', cart: user.cart };
    } catch (error) {
        console.error(error);
        return { status: 500, message: 'Server error', error };
    }
}
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user?.userId; 
        const { productId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        user.cart.splice(productIndex, 1);

        await user.save();

        return res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getCartItems = async (req,res) => {
    try {
        
        const userId =  req.user.userId;
        if (!userId) {
            return res.status(400).json({ message: 'User ID not found' });
        }
        const user = await User.findById(userId).select('cart').populate('cart.productId')
         if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.cart || user.cart.length === 0) { 
            return res.status(200).json({ message: 'Cart is empty' });
        }
        return res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}
const getSearchProduct = async (req, res) => {
    try {
        const searchQuery = req.query.q; 
        console.log('Trimmed search term:', searchQuery);
        if (!searchQuery) {
            return res.status(400).send('Search term cannot be empty'); 
        }

        console.log('Search term:', searchQuery); 
        
  
        const products = await Products.find({
            ProductName: { $regex: searchQuery, $options: 'i' } 
          });
          

          if (products.length === 0) {
            return res.status(200).json([]);
        }
        

        console.log('Found products:', products); 

        res.json(products); 
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error');
    }
};
const getTotalProducts = async (req,res) => {
    try {
        const totalProducts = await Products.countDocuments(); 
        res.json({ totalProducts });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching total products' });
    }
}
export { addProduct, getAllProducts, getManProducts, getWomenProducts, getSpecProduct, deleteProduct, updateProduct, addToCart,removeFromCart ,getCartItems,getSearchProduct, getTotalProducts};