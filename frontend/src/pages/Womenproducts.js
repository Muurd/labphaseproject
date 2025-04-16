import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Womenproducts() {
    const [Womenproducts,setWomenproducts] = useState([]);
    const [sortOption, setSortOption] = useState("Featured");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q'); 
        const navigate = useNavigate()
        const GotoAllproducts = () => {
            navigate('/allproducts')
        }
        const GotoMenproducts = () => {
            navigate('/allproducts/Men')
        }
        const GotoWomenproducts = () => {
            navigate('/allproducts/Women')
        }
     
        useEffect(() => {
          const fetchProducts = async () => {
            const token = localStorage.getItem('token'); 
            try {
              let response;
        
              if (searchQuery) {
                response = await axios.get('http://localhost:5000/api/products/getSearchProduct', {
                  params: { q: searchQuery },
                  headers: { Authorization: `Bearer ${token}` }
                });
        
                setWomenproducts(response.data);
              } else {
                response = await axios.get("http://localhost:5000/api/products/Getwomenproducts", {
                  headers: { Authorization: `Bearer ${token}` }
                });
        
                setWomenproducts(response.data.Womenproducts);
              }
        
            } catch (error) {
              if (error.response && error.response.status === 404) {
                  console.log("No products found");
                  setWomenproducts([]); 
                } else {
                  console.error('Failed to fetch products:', error);
                }
            }
          };
        
          fetchProducts();
        }, [searchQuery]);
            const handleSort = (e) => {
                setSortOption(e.target.value);
            };
            const sortedProducts = () => {
                let sortedArray = [...Womenproducts];
        
                switch (sortOption) {
                    case "Price: Low to High":
                        sortedArray = sortedArray.sort((a, b) => a.price - b.price);
                        break;
                    case "Price: High to Low":
                        sortedArray = sortedArray.sort((a, b) => b.price - a.price);
                        break;
                    case "Newest":
                        sortedArray = sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                        break;
                    default:
                        break;
                }
                return sortedArray;
            };
            const handleCardClick = (product) => {
                navigate(`/allproducts/Women/${product._id}`);
              };
              
    return (
        <div>
            <div>
                <Navbar />
                <div style={{ padding: "4rem 2rem", backgroundColor: "#f8f9fa", fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh" }}>
                    <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
                        <div style={{ marginBottom: "3rem" }}>
                            <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "0.75rem", color: "#111827" }}>Our Products</h1>
                            <p style={{ fontSize: "1.125rem", color: "#6b7280", maxWidth: "600px", lineHeight: "1.6" }}>Discover our collection of high-quality products designed for your lifestyle.</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
                            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                                <button style={{ padding: "0.5rem 1.25rem", backgroundColor: "white", color: "#374151", border: "none", borderRadius: "0.375rem", fontWeight: "500", cursor: "pointer" }} onClick={GotoAllproducts}>All</button>
                                <button style={{ padding: "0.5rem 1.25rem", backgroundColor: "white", color: "#374151", border: "1px solid #e5e7eb", borderRadius: "0.375rem", fontWeight: "500", cursor: "pointer" }} onClick={GotoMenproducts}>Men</button>
                                <button style={{ padding: "0.5rem 1.25rem", backgroundColor: "#D4AF37", color: "white", border: "1px solid #e5e7eb", borderRadius: "0.375rem", fontWeight: "500", cursor: "pointer" }} onClick={GotoWomenproducts}>Women</button>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label style={{ fontSize: "0.875rem", color: "#374151" }}>Sort by:</label>
                                <select style={{ padding: "0.5rem 1rem", border: "1px solid #e5e7eb", borderRadius: "0.375rem", backgroundColor: "white", cursor: "pointer", color: "#374151" }} value={sortOption} onChange={handleSort}>
                                    <option>Featured</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
                            {sortedProducts().map((product) => (
                                <div
                                    style={{
                                        backgroundColor: "white",
                                        borderRadius: "0px",
                                        overflow: "hidden",
                                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                                    }} onClick={() => handleCardClick(product)}
                                    key={product._id}  
                                >
                                    <div style={{ position: "relative", paddingTop: "100%", backgroundColor: "#f3f4f6" }}>
                                        <img
                                            src={product.img || "/placeholder.svg?height=300&width=300"}
                                            alt={product.ProductName}
                                            style={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: "0.75rem",
                                                right: "0.75rem",
                                                backgroundColor: "#D4AF37",
                                                color: "white",
                                                fontSize: "0.75rem",
                                                fontWeight: "600",
                                                padding: "0.25rem 0.75rem",
                                                borderRadius: "9999px"
                                            }}
                                        >
                                            New
                                        </div>
                                    </div>
                                    <div style={{ padding: "1.25rem" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                            <h3 style={{ fontSize: "1rem", fontWeight: "600", color: "#111827" }}>{product.ProductName}</h3>
                                            <span style={{ fontSize: "1.125rem", fontWeight: "700", color: "#D4AF37" }}>${product.price}</span>
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
                                            <div style={{ display: "flex", marginRight: "0.5rem" }}>
                                            </div>
                                            <span style={{ fontSize: "0.75rem", color: "#6b7280" }}>{product.description}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Womenproducts
