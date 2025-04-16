import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FeaturedProducts() {
    const [AllTheProducts, setAllTheProducts] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        const showProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products/getProducts")
                console.log(res.data)
                setAllTheProducts(res.data.AllProducts)
            } catch (error) {
                console.log(error)
            }
        }
        showProducts();
    }, [])
    const newestProducts = [...AllTheProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            ;<section
                style={{ padding: "4rem 2rem", backgroundColor: "#f8f9fa", fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <h2 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.75rem", color: "#111827" }}>
                        Our newest products
                    </h2>
                    <div
                        style={{
                            width: "80px",
                            height: "4px",
                            background: "linear-gradient(to right, #D4AF37, #D4AF37)",
                            margin: "0.75rem auto",
                            borderRadius: "0px",
                        }}
                    ></div>
                    <p style={{ color: "#6b7280", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                        Discover our most popular items from the latest collection
                    </p>
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                        gap: "2rem",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}
                >
                    {newestProducts.map((product) => (
                        <div key={product._id} style={{
                            backgroundColor: "white",
                            borderRadius: "0px",
                            overflow: "hidden",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
                        }} onClick={()=>{navigate('/allproducts')}}>
                            <div style={{ position: "relative", height: "280px", overflow: "hidden" }}>
                                <img
                                    src={product.img || "/placeholder.svg?height=300&width=300"}
                                    alt={product.ProductName}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                                <div style={{
                                    position: "absolute",
                                    top: "1rem",
                                    right: "1rem",
                                    backgroundColor: " #D4AF37",
                                    color: "white",
                                    fontSize: "0.875rem",
                                    fontWeight: "600",
                                    padding: "0.25rem 0.75rem",
                                    borderRadius: "0px",
                                }}>
                                    New
                                </div>
                            </div>
                            <div style={{ padding: "1.5rem" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    marginBottom: "0.75rem",
                                }}>
                                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#111827" }}>{product.ProductName}</h3>
                                    <span style={{ fontSize: "1.25rem", fontWeight: "700", color: " #D4AF37" }}>${product.price}</span>
                                </div>
                                <p style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "1rem", lineHeight: "1.5" }}>
                                    {product.description}
                                </p>
                                
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: "center", marginTop: "3rem" }}>
                    <button
                        style={{
                            backgroundColor: "transparent",
                            border: "2px solid  #D4AF37",
                            color: " #D4AF37",
                            fontWeight: "600",
                            padding: "0.75rem 2rem",
                            borderRadius: "8px",
                            cursor: "pointer",
                        }} onClick={()=>{navigate('/allproducts')}}
                    >
                        View All Products
                    </button>
                </div>
            </section>

        </div>
    )
}

export default FeaturedProducts
