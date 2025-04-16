import React, { useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import axios from 'axios'

function Contact() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !subject || !message) {
          alert('Please fill in all fields!');
          return;
        }
    
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/auth/send-email`,
            {
              name,
              email,
              subject,
              message,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, 
              },
            }
          );
          alert('Email sent successfully!');
          setName('')
          setEmail('')
          setSubject('')
          setMessage('')
        } catch (error) {
          alert('Failed to send email');
        }
      };
    return (
        <div>
            <Navbar/>
            <div
                style={{
                    padding: "4rem 2rem",
                    backgroundColor: "#f8f9fa",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
                    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h1 style={{ fontSize: "3rem", fontWeight: "800", marginBottom: "1rem", color: "#111827", lineHeight: "1.2" }}>
                            Get in Touch
                        </h1>
                        <p style={{ fontSize: "1.125rem", color: "#6b7280", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
                            Have questions or want to work with us? Fill out the form below and we'll get back to you as soon as possible.
                        </p>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "3rem", alignItems: "flex-start" }}>
                        <div
                            style={{
                                flex: "1 1 600px",
                                backgroundColor: "white",
                                borderRadius: "1rem",
                                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                                padding: "2.5rem",
                                order: "2",
                            }}
                        >
                            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "#111827" }}>
                                Send us a message
                            </h2>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                    }}
                                >
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #e5e7eb",
                                        outline: "none",
                                        transition: "border-color 0.2s ease",
                                    }} value={name} onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                    }}
                                >
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    placeholder="john@example.com"
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #e5e7eb",
                                        outline: "none",
                                        transition: "border-color 0.2s ease",
                                    }} value={email} onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "1.5rem" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                    }}
                                >
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="How can we help you?"
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #e5e7eb",
                                        outline: "none",
                                        transition: "border-color 0.2s ease",
                                    }} value={subject} onChange={(e)=>{setSubject(e.target.value)}}
                                />
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <label
                                    style={{
                                        display: "block",
                                        marginBottom: "0.5rem",
                                        fontSize: "0.875rem",
                                        fontWeight: "500",
                                        color: "#374151",
                                    }}
                                >
                                    Message
                                </label>
                                <textarea
                                    placeholder="Your message here..."
                                    rows={5}
                                    style={{
                                        width: "100%",
                                        padding: "0.75rem 1rem",
                                        borderRadius: "0.5rem",
                                        border: "1px solid #e5e7eb",
                                        outline: "none",
                                        transition: "border-color 0.2s ease",
                                        resize: "vertical",
                                    }} value={message} onChange={(e)=>{setMessage(e.target.value)}}
                                ></textarea>
                            </div>

                            <button
                                style={{
                                    backgroundColor: "#D4AF37",
                                    color: "white",
                                    fontWeight: "600",
                                    padding: "0.875rem 2rem",
                                    borderRadius: "0.5rem",
                                    border: "none",
                                    cursor: "pointer",
                                    transition: "background-color 0.2s ease",
                                    fontSize: "1rem",
                                }} onClick={handleSubmit}
                            >
                                Send Message
                            </button>
                        </div>
                        <div style={{ flex: "1 1 300px", order: "1" }}>
                            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "#111827" }}>
                                Contact Information
                            </h2>

                            <div style={{ marginBottom: "2rem" }}>
                                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                                    <div
                                        style={{
                                            backgroundColor: "#ede9fe",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "1rem",
                                            flexShrink: "0",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "20px", height: "20px", color: "#D4AF37" }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            ></path>
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem", color: "#111827" }}>
                                            Our Location
                                        </h3>
                                        <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                                            123 Business Avenue
                                            <br />
                                            Suite 500
                                            <br />
                                            San Francisco, CA 94107
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                                    <div
                                        style={{
                                            backgroundColor: "#ede9fe",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "1rem",
                                            flexShrink: "0",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "20px", height: "20px", color: "#D4AF37" }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem", color: "#111827" }}>
                                            Phone Number
                                        </h3>
                                        <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                                            +1 (555) 123-4567
                                            <br />
                                            Mon-Fri from 8am to 6pm
                                        </p>
                                    </div>
                                </div>

                                <div style={{ display: "flex", alignItems: "flex-start" }}>
                                    <div
                                        style={{
                                            backgroundColor: "#ede9fe",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            marginRight: "1rem",
                                            flexShrink: "0",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "20px", height: "20px", color: "#D4AF37" }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "0.25rem", color: "#111827" }}>
                                            Email Address
                                        </h3>
                                        <p style={{ color: "#6b7280", lineHeight: "1.5" }}>
                                            contact@example.com
                                            <br />
                                            support@example.com
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem", color: "#111827" }}>Follow Us</h3>
                                <div style={{ display: "flex", gap: "0.75rem" }}>
                                    <a
                                        href="#"
                                        style={{
                                            backgroundColor: "#D4AF37",
                                            color: "white",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "transform 0.2s ease",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "18px", height: "18px" }}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        style={{
                                            backgroundColor: "#D4AF37",
                                            color: "white",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "transform 0.2s ease",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "18px", height: "18px" }}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        style={{
                                            backgroundColor: "#D4AF37",
                                            color: "white",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "transform 0.2s ease",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "18px", height: "18px" }}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        style={{
                                            backgroundColor: "#D4AF37",
                                            color: "white",
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "transform 0.2s ease",
                                        }}
                                    >
                                        <svg
                                            style={{ width: "18px", height: "18px" }}
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: "4rem",
                            borderRadius: "1rem",
                            overflow: "hidden",
                            height: "400px",
                            backgroundColor: "#e5e7eb",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                textAlign: "center",
                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#D4AF37",
                                    color: "white",
                                    width: "60px",
                                    height: "60px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto 1rem",
                                }}
                            >
                                <svg
                                    style={{ width: "30px", height: "30px" }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    ></path>
                                </svg>
                            </div>
                            <p style={{ fontWeight: "600", color: "#111827" }}>Map placeholder - Your business location</p>
                        </div>
                    </div>
                </div>
            </div>
        <Footer/>
        </div>
    )
}

export default Contact
