import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Ordersmanagment() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/getOrders')
                console.log(response.data)
                console.log(response.data.allorders[0].items[0].productId)
                setOrders(response.data.allorders)
            } catch (error) {
                console.log(error)
            }
        }
        getAllOrders()
    }, [])
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/orders/${orderId}/update-status`, 
                { paymentStatus: newStatus }
            );

            if (response.status === 200) {
                console.log('Order status updated successfully!');
                const updatedOrder = response.data.order;
                setOrders((prevOrders) => 
                    prevOrders.map((order) =>
                        order._id === updatedOrder._id ? updatedOrder : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };
    return (
        <div>
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "15px",
                    fontFamily: "Arial, sans-serif",
                }}
            >
                <h1
                    style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        marginBottom: "15px",
                    }}
                >
                    Manage Orders
                </h1>
                {orders.map((order) => (
                    <div
                        key={order._id}
                        style={{
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            padding: "15px",
                            backgroundColor: "#fff",
                            overflowX: "auto",
                            marginBottom: "20px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: window.innerWidth < 640 ? "column" : "row",
                                justifyContent: "space-between",
                                alignItems: window.innerWidth < 640 ? "flex-start" : "center",
                                marginBottom: "15px",
                                paddingBottom: "10px",
                                borderBottom: "1px solid #e2e8f0",
                                gap: "10px",
                            }}
                        >
                            <div>
                                <h2
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Order ID: {order._id}
                                </h2>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        color: "#666",
                                        marginTop: "5px",
                                    }}
                                >
                                  Order creation date : {new Date(order.createdAt).toLocaleString()} Username : {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                </p>
                            </div>
                            <div>
                                <label
                                    htmlFor="status"
                                    style={{
                                        fontSize: "14px",
                                        marginRight: "8px",
                                    }}
                                >
                                    Status:
                                </label>
                                <select
                                    id="status"
                                    value={order.paymentStatus || "Pending"}
                                    style={{
                                        padding: "6px 12px",
                                        borderRadius: "4px",
                                        border: "1px solid #ddd",
                                        backgroundColor: "#fff",
                                        fontSize: "14px",
                                    }} onChange={(e) => handleStatusChange(order._id, e.target.value)} 
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ overflowX: "auto" }}>
                            <table
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse",
                                    minWidth: "500px",
                                }}
                            >
                                <thead>
                                    <tr
                                        style={{
                                            backgroundColor: "#f8fafc",
                                            textAlign: "left",
                                        }}
                                    >
                                        <th
                                            style={{
                                                padding: "10px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                borderBottom: "1px solid #e2e8f0",
                                            }}
                                        >
                                            Product
                                        </th>
                                        <th
                                            style={{
                                                padding: "10px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                borderBottom: "1px solid #e2e8f0",
                                            }}
                                        >
                                            Quantity
                                        </th>
                                        <th
                                            style={{
                                                padding: "10px",
                                                fontSize: "14px",
                                                fontWeight: "600",
                                                borderBottom: "1px solid #e2e8f0",
                                                textAlign: "right",
                                            }}
                                        >
                                            Price
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {order.items.map((item) => (
                                        <tr
                                            key={item._id}
                                            style={{
                                                borderBottom: "1px solid #e2e8f0",
                                            }}
                                        >
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                Product ID: {item.productId._id}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {item.quantity}
                                            </td>
                                            <td
                                                style={{
                                                    padding: "10px",
                                                    fontSize: "14px",
                                                    textAlign: "right",
                                                }}
                                            >
                                                ${item.productId.price ? item.productId.price.toFixed(2) : "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td
                                            colSpan={2}
                                            style={{
                                                padding: "10px",
                                                fontSize: "14px",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Total:
                                        </td>
                                        <td
                                            style={{
                                                padding: "10px",
                                                fontSize: "14px",
                                                textAlign: "right",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            ${typeof order.totalAmount === "number" ? order.totalAmount.toFixed(2) : "N/A"}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    )
}

export default Ordersmanagment
