import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const token = localStorage.getItem('token');
function Cart() {
    const [carts, setCarts] = useState([]);
    const [cartsCount,setCartsCount] = useState(0)
    let [totalPrice,setTotalPrice] =  useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        const getCartItems = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/cart/get`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                const cart = response.data.cart || [];
                setCarts(cart);
                setCartsCount(cart.length);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            getCartItems();
        }
    }, [token]);
    console.log(`${token}`)
    useEffect(() => {
        const getTotalPrice = () => {
            const total = carts.reduce((sum, item) => {
                const price = item.productId?.price || 0;
                const quantity = item.quantity || 1;
                return sum + price * quantity;
            }, 0);
            console.log(`Total Price: ${total}`);
            setTotalPrice(total);
        };
    
        getTotalPrice();
    }, [carts]);

    const increaseQuantity = async (productId) => {
        const item = carts.find(cartItem => cartItem.productId._id === productId);
        if (item) {
            const newQuantity = item.quantity + 1;
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/auth/cart/quantity`,
                    { productId, quantity: newQuantity },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const updatedCarts = carts.map(cartItem => 
                    cartItem.productId._id === productId
                        ? { ...cartItem, quantity: newQuantity }  
                        : cartItem  
                );
                setCarts(updatedCarts);
            } catch (error) {
                console.error("Error updating quantity:", error.response ? error.response.data : error);
            }
        }
    };
    const decreaseQuantity = async (productId) => {
        const item = carts.find(cartItem => cartItem.productId._id === productId);
        if (item) {
            const newQuantity = item.quantity - 1;
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API_URL}/api/auth/cart/quantity`,
                    { productId, quantity: newQuantity },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const updatedCarts = carts.map(cartItem => 
                    cartItem.productId._id === productId
                        ? { ...cartItem, quantity: newQuantity }  
                        : cartItem  
                );
                setCarts(updatedCarts);
            } catch (error) {
                console.error("Error updating quantity:", error.response ? error.response.data : error);
            }
        }
    };
    
    
    
    const removeCartItem = async (productId) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/products/cart/remove`, { productId }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data)
            const removedCart = carts.filter(cartItem => cartItem._id !== productId)
            setCarts(removedCart)
            alert('Cart has been removed')
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }   
    }
    const handleCheckout = () => {
        if (carts.length !== 0){
            navigate('/checkout', { state: { carts, totalPrice } });
        } 
      };
    return (
        <div>
            <Navbar/>
            <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
                <h1 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem" }}>Your Cart ({cartsCount})</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        {carts && carts.length ? (
                            carts.map((cartItem) => (
                                <div key={cartItem._id} style={{ display: "flex", gap: "1rem", padding: "1rem", borderBottom: "1px solid #eee" }}>

                                    <img
                                        src={cartItem.productId.img || "/placeholder.svg?height=80&width=80"}
                                        alt="Product"
                                        style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "4px" }}
                                    />

                                    <div style={{ flex: "1", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <div>
                                            <h3 style={{ fontSize: "1rem", fontWeight: "500", marginBottom: "0.25rem" }}>
                                                {cartItem.productId.ProductName || "Product Name"}
                                            </h3>
                                            <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>
                                                Unit Price: ${cartItem.productId.price || "0.00"}
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <button
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    fontSize: "0.875rem",
                                                    color: "#666",
                                                    cursor: "pointer",
                                                    padding: "0",
                                                }}
                                                onClick={() => removeCartItem(cartItem.productId._id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        <button
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                border: "1px solid #ddd",
                                                background: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => decreaseQuantity(cartItem.productId._id)}
                                        >
                                            -
                                        </button>
                                        <span style={{ width: "24px", textAlign: "center" }}>{cartItem.quantity}</span>
                                        <button
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                border: "1px solid #ddd",
                                                background: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => increaseQuantity(cartItem.productId._id)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div style={{ width: "80px", textAlign: "right", fontWeight: "500" }}>
                                        ${(cartItem.productId.price * cartItem.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty</p>
                        )}

                    </div>
                </div>

                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <div>
                        <button
                            style={{
                                background: "none",
                                border: "none",
                                color: "#666",
                                textDecoration: "underline",
                                cursor: "pointer",
                            }}
                        >
                            Continue Shopping
                        </button>
                    </div>

                    <div style={{ width: "300px", padding: "1rem", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span>Subtotal:</span>
                            <span>${totalPrice}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: "600",
                                marginTop: "0.5rem",
                                paddingTop: "0.5rem",
                                borderTop: "1px solid #eee",
                            }}
                        >
                            <span>Total:</span>
                            <span>${totalPrice}</span>
                        </div>
                        <button
                            style={{
                                width: "100%",
                                padding: "0.75rem",
                                backgroundColor: "#000",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                marginTop: "1rem",
                                fontWeight: "500",
                                cursor: "pointer",
                            }} onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Cart
