import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Checkout() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const { carts, totalPrice } = location.state || {};
    console.log("Total Price in Checkout:", totalPrice);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        const token = localStorage.getItem('token')
        e.preventDefault();
        if (!firstName || !lastName || !address || !city || !state || !zip || !cardName || !cardNumber) {
            setError("All fields are required");
            return;
        }

        const orderData = {
            firstName,
            lastName,
            address,
            city,
            state,
            zip,
            totalAmount: totalPrice,
            cardName,
            cardNumber
        };

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/orders/checkout`,
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            navigate('/home')
            alert('Thank you for your purshase!')
        } catch (err) {
            setError('Failed to place order, please try again.');
            console.error("Error placing order:", err);
        }
    };
    return (
        <div>
            <Navbar />
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 16px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "24px" }}>Checkout</h1>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "32px" }}>
                    <div style={{ order: 2 }}>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>Order Summary</h2>
                        <div
                            style={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <div style={{ padding: "16px", boxShadow:'2px 2px 20px 20px rgba(200,200,200,0.52)' }}>
                                {carts.map((item) => (
                                    <div key={item._id} style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                                        <div style={{ position: "relative", width: "96px", height: "96px", flexShrink: 0 }}>
                                            <img
                                                src={item.productId?.img || "https://via.placeholder.com/96"}
                                                alt="Product"
                                                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "6px" }}
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontWeight: "500" }}>{item.productId?.ProductName || "Product Name"}</h3>
                                            <p style={{ fontSize: "14px", color: "#6b7280" }}>{item.productId?.description || "Description"}</p>
                                            <p style={{ fontSize: "14px", marginTop: "4px" }}>Quantity: {item.quantity}</p>
                                            <p style={{ fontWeight: "500", marginTop: "8px" }}>
                                                ${(item.productId?.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <hr style={{ margin: "16px 0", borderColor: "#e5e7eb" }} />

                                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Subtotal</span>
                                        <span>${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Shipping</span>
                                        <span>$4.99</span> 
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Tax</span>
                                        <span>$0.00</span> 
                                    </div>
                                    <hr style={{ margin: "8px 0", borderColor: "#e5e7eb" }} />
                                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "500" }}>
                                        <span>Total</span>
                                        <span>${(totalPrice + 4.99 + 12.5).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div style={{ order: 1 }}>
                        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "16px" }}>Payment Details</h2>
                        <div
                            style={{
                                backgroundColor: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <div style={{ padding: "16px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <h3 style={{ fontWeight: "500" }}>Billing Address</h3>

                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="firstName" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    First Name
                                                </label>
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }} value={firstName} onChange={(e) => { setFirstName(e.target.value) }}
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="lastName" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    Last Name
                                                </label>
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }} value={lastName} onChange={(e) => { setLastName(e.target.value) }}
                                                />
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <label htmlFor="address" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                Address
                                            </label>
                                            <input
                                                id="address"
                                                type="text"
                                                style={{
                                                    width: "100%",
                                                    padding: "8px 12px",
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: "6px",
                                                    outline: "none",
                                                }} value={address} onChange={(e) => { setAddress(e.target.value) }}
                                            />
                                        </div>

                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="city" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    City
                                                </label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }} value={city} onChange={(e) => { setCity(e.target.value) }}
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="state" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    State
                                                </label>
                                                <input
                                                    id="state"
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }} value={state} onChange={(e) => { setState(e.target.value) }}
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="zip" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    ZIP Code
                                                </label>
                                                <input
                                                    id="zip"
                                                    type="text"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }} value={zip} onChange={(e) => { setZip(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <hr style={{ borderColor: "#e5e7eb" }} />

                                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ marginRight: "8px" }}>💳</span>
                                            <h3 style={{ fontWeight: "500" }}>Card Information</h3>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <label htmlFor="cardName" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                Name on Card
                                            </label>
                                            <input
                                                id="cardName"
                                                type="text"
                                                style={{
                                                    width: "100%",
                                                    padding: "8px 12px",
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: "6px",
                                                    outline: "none",
                                                }} value={cardName} onChange={(e) => { setCardName(e.target.value) }}
                                            />
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                            <label htmlFor="cardNumber" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                Card Number
                                            </label>
                                            <input
                                                id="cardNumber"
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                style={{
                                                    width: "100%",
                                                    padding: "8px 12px",
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: "6px",
                                                    outline: "none",
                                                }} value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }}
                                            />
                                        </div>

                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="expiry" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    Expiry Date
                                                </label>
                                                <input
                                                    id="expiry"
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                                <label htmlFor="cvc" style={{ display: "block", fontSize: "14px", fontWeight: "500" }}>
                                                    CVC
                                                </label>
                                                <input
                                                    id="cvc"
                                                    type="text"
                                                    placeholder="123"
                                                    style={{
                                                        width: "100%",
                                                        padding: "8px 12px",
                                                        border: "1px solid #d1d5db",
                                                        borderRadius: "6px",
                                                        outline: "none",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        style={{
                                            width: "100%",
                                            backgroundColor: "black",
                                            color: "white",
                                            fontWeight: "500",
                                            padding: "8px 16px",
                                            borderRadius: "6px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            border: "none",
                                            cursor: "pointer",
                                        }} onClick={handleSubmit}
                                    >
                                        <span style={{ marginRight: "8px" }}>🛒</span>
                                        Complete Purchase
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx>{`
        @media (min-width: 768px) {
          div > div {
            grid-template-columns: 1fr 1fr;
          }
          div > div > div:nth-child(1) {
            order: 1; /* Order summary on left */
          }
          div > div > div:nth-child(2) {
            order: 2; /* Payment form on right */
          }
        }
      `}</style>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout
