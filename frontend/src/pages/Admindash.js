"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Admindash() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [profile, setProfile] = useState(null)
  const [orders, setOrders] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/getOrders`)
        console.log(response.data)
        console.log(response.data.allorders[0].items[0].productId)
        setOrders(response.data.allorders)
      } catch (error) {
        console.log(error)
      }
    }
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/getTotalProducts`);
        setTotalProducts(response.data.totalProducts);
      } catch (error) {
        console.error("Error fetching total products:", error);
      }
    };


    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/totalOrders`);
        setTotalOrders(response.data.totalOrders);
      } catch (error) {
        console.error("Error fetching total orders:", error);
      }
    };

    const fetchTotalRevenue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/totalRevenue`);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
      }
    };


    fetchTotalProducts();
    fetchTotalOrders();
    fetchTotalRevenue();
    getAllOrders()
  }, [])
  const goToProductManagment = () => {
    navigate("/admin/productManagment")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token")
      console.log("Token:", token)

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log("Response data:", response.data)
        setProfile(response.data)
      } catch (error) {
        console.log("Error:", error.response?.data || error.message)
      }
    }
    getProfile()
  }, [])
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <button
        onClick={toggleSidebar}
        className="sidebar-toggle"
        style={{
          position: "fixed",
          top: "1rem",
          left: sidebarOpen ? "250px" : "1rem",
          zIndex: 100,
          background: "#000000",
          border: "none",
          borderRadius: "0.375rem",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "left 0.3s ease",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {sidebarOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>
      <div
        className="sidebar"
        style={{
          width: "250px",
          backgroundColor: "#000000",
          color: "white",
          padding: "1.5rem 1rem",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          left: sidebarOpen ? "0" : "-250px",
          transition: "left 0.3s ease",
          zIndex: 50,
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: "2rem", paddingTop: "2rem" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "0.5rem" }}>Admin Panel</h1>
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.1)", marginTop: "0.5rem" }}></div>
        </div>

        <nav style={{ flex: "1" }}>
          <ul
            style={{
              listStyle: "none",
              padding: "0",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <li>
              <a
                href="#"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                }}
              >
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
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
                Product Management
              </a>
            </li>

          </ul>
        </nav>

        <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "9999px",
                backgroundImage: `url(${profile ? profile.img : ""})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >

            </div>
            <div>
              <p style={{ fontSize: "0.875rem", margin: "0" }}>{profile ? profile.Name : 'Admin user'}</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", margin: "0" }}>{profile ? profile.email : 'admin@gmail.com'}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="main-content"
        style={{
          marginLeft: sidebarOpen ? "250px" : "0",
          flex: "1",
          padding: "1.5rem",
          backgroundColor: "#f8fafc",
          transition: "margin-left 0.3s ease",
          width: "100%",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        <header style={{ marginBottom: "2rem", paddingTop: sidebarOpen ? "0" : "3rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1e293b", marginBottom: "0.5rem" }}>Dashboard</h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Welcome back, Admin User</p>
        </header>

        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
            }}
            onClick={goToProductManagment}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
            >
              <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", margin: "0" }}>Total Products</h3>
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  borderRadius: "9999px",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  style={{ color: "#0ea5e9" }}
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
            </div>
            <p style={{ fontSize: "1.875rem", fontWeight: "600", color: "#0f172a", margin: "0" }}>{totalProducts}</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#22c55e",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              12% from last month
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }} onClick={() => { navigate('/admin/orders') }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
            >
              <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", margin: "0" }}>Pending Orders</h3>
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  borderRadius: "9999px",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  style={{ color: "#f59e0b" }}
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
            </div>
            <p style={{ fontSize: "1.875rem", fontWeight: "600", color: "#0f172a", margin: "0" }}>{totalOrders}</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              4% from yesterday
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
            >
              <h3 style={{ fontSize: "0.875rem", fontWeight: "500", color: "#64748b", margin: "0" }}>Total Revenue</h3>
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  borderRadius: "9999px",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                  style={{ color: "#10b981" }}
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
            </div>
            <p style={{ fontSize: "1.875rem", fontWeight: "600", color: "#0f172a", margin: "0" }}>${totalRevenue}</p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "#22c55e",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.5rem",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
              8% from last month
            </p>
          </div>
        </div>

        <div
          className="orders-table-container"
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            overflowX: "auto",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}
          >
            <h2 style={{ fontSize: "1.125rem", fontWeight: "600", color: "#1e293b", margin: "0" }}>Recent Orders</h2>
            <button
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "0.375rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                color: "#64748b",
                cursor: "pointer",
              }} onClick={() => { navigate('/admin/orders') }}
            >
              View All
            </button>
          </div>

          <div style={{ overflowX: "auto", width: "100%" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.875rem",
                minWidth: "600px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Order ID
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Customer
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      color: "#64748b",
                      fontWeight: "500",
                    }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                      {`#ORD-${order._id}`}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                      {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", color: "#64748b" }}>
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                      ${order.totalAmount?.toFixed(2)}
                    </td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span
                        style={{
                          backgroundColor:
                            order.paymentStatus === "Delivered"
                              ? "#dcfce7"
                              : order.paymentStatus === "Processing"
                                ? "#fef9c3"
                                : "#fee2e2",
                          color:
                            order.paymentStatus === "Delivered"
                              ? "#166534"
                              : order.paymentStatus === "Processing"
                                ? "#854d0e"
                                : "#9b1c1c",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          padding: "0.25rem 0.5rem",
                          borderRadius: "9999px",
                        }}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style>{`
                * {
                    box-sizing: border-box;
                }
                
                body {
                    margin: 0;
                    padding: 0;
                    overflow-x: hidden;
                }
                
                @media (max-width: 768px) {
                    .sidebar-toggle {
                        top: 0.5rem !important;
                        left: ${sidebarOpen ? "250px" : "0.5rem"} !important;
                    }
                    
                    .stats-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
                
                @media (max-width: 640px) {
                    .main-content {
                        padding: 1rem !important;
                    }
                }
            `}</style>
    </div>
  )
}

export default Admindash
