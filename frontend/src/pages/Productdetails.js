import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const { jwtDecode } = require('jwt-decode');

function Productdetails() {
    const [selectedColor, setSelectedColor] = useState("black")
    const [specProduct,setSpecProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const { id } = useParams();
    useEffect(() => {
        const getSpecificProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/getProducts/${id}`);
                setSpecProduct(res.data); 
            } catch (error) {
                console.log(error);
            }
        };
        getSpecificProduct();
    }, [id]);
   
    if (!specProduct) {
        return <div>Loading...</div>;
    }
    const addToCart = async (userId,productId,quantity) => {
        try {
            const response = await axios.post('http://localhost:5000/api/products/cart/add',{userId,productId,quantity})
            console.log(response.data)
            alert('Added to cart')
        } catch (error) {
            console.log(error)
        }
    }
    const getUserIdFromToken = () => {
        const token = localStorage.getItem("token");  
        if (token) {
            const decodedToken = jwtDecode(token);  
            return decodedToken.userId;  
        }
        return null;
    };
    
    const userId = getUserIdFromToken();
    console.log(userId)
    return (
        <div>
            <Navbar/>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "2rem",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                }}
            >
                <div style={{ display: "flex", flexDirection: "row", gap: "2rem", flexWrap: "wrap" }}>
                    <div style={{ flex: "1", minWidth: "300px" }}>
                        <div
                            style={{
                                position: "relative",
                                aspectRatio: "1/1",
                                backgroundColor: "#f5f5f5",
                                borderRadius: "0.5rem",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={specProduct.img}
                                alt="Product Image"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                            {["black", "blue", "gray", "white"].map((color) => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        border: selectedColor === color ? "2px solid #000" : "1px solid #ddd",
                                        borderRadius: "0.25rem",
                                        padding: "2px",
                                        cursor: "pointer",
                                        backgroundColor: color === "white" ? "#f8f8f8" : color,
                                    }}
                                >
                                    <span
                                        style={{
                                            position: "absolute",
                                            width: "1px",
                                            height: "1px",
                                            padding: "0",
                                            margin: "-1px",
                                            overflow: "hidden",
                                            clip: "rect(0, 0, 0, 0)",
                                            whiteSpace: "nowrap",
                                            borderWidth: "0",
                                        }}
                                    >
                                        {color}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div style={{ flex: "1", minWidth: "300px" }}>
                        <div style={{ marginBottom: "1rem" }}>
                            <span style={{ fontSize: "0.875rem", color: "#6b7280", fontWeight: "500" }}>PREMIUM COLLECTION</span>
                            <h1 style={{ fontSize: "1.875rem", fontWeight: "600", margin: "0.5rem 0" }}>{specProduct.ProductName}</h1>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                <div style={{ display: "flex", color: "#f59e0b" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg
                                            key={star}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            style={{ marginRight: "2px" }}
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>4.9 (120 reviews)</span>
                            </div>
                            <p style={{ fontSize: "1.5rem", fontWeight: "700", color: "#111827", marginBottom: "1rem" }}>{specProduct.price}$</p>
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <p style={{ fontSize: "0.875rem", lineHeight: "1.5", color: "#4b5563", marginBottom: "1rem" }}>{specProduct.description}</p>
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
                                Color: <span style={{ textTransform: "capitalize" }}>{specProduct.color}</span>
                            </label>
                            <div style={{ display: "flex", gap: "0.5rem" }}>
                                {["black", "blue", "gray", "white"].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        style={{
                                            width: "2rem",
                                            height: "2rem",
                                            borderRadius: "9999px",
                                            backgroundColor: color === "white" ? "#f8f8f8" : color,
                                            border: selectedColor === color ? "2px solid #000" : "1px solid #ddd",
                                            cursor: "pointer",
                                        }}
                                        aria-label={`Select ${color} color`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
                                Quantity
                            </label>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "fit-content",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "0.375rem",
                                }}
                            >
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                                <span style={{ width: "2.5rem", textAlign: "center", fontSize: "0.875rem", fontWeight: "500" }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{
                                        width: "2.5rem",
                                        height: "2.5rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <button
                                style={{
                                    flex: "1",
                                    minWidth: "200px",
                                    backgroundColor: "#000",
                                    color: "#fff",
                                    border: "none",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "0.375rem",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s",
                                }} onClick={() => addToCart(userId, specProduct._id, quantity)}
                            >
                                Add to Cart
                            </button>
                            <button
                                style={{
                                    flex: "1",
                                    minWidth: "200px",
                                    backgroundColor: "transparent",
                                    color: "#000",
                                    border: "1px solid #e5e7eb",
                                    padding: "0.75rem 1.5rem",
                                    borderRadius: "0.375rem",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s",
                                }}
                            >
                                Save to Wishlist
                            </button>
                        </div>

                        <div style={{ marginTop: "2rem", padding: "1rem 0", borderTop: "1px solid #e5e7eb" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ color: "#4b5563" }}
                                >
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                                <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>Free shipping on orders over $50</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    style={{ color: "#4b5563" }}
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span style={{ fontSize: "0.875rem", color: "#4b5563" }}>In stock and ready to ship</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Productdetails
