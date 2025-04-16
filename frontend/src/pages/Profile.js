import axios from "axios";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";


function Profile() {
    const [profile, setProfile] = useState(null);
    const [imageError, setImageError] = useState(false)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'unsigned_preset');

            try {

                const res = await axios.post('https://api.cloudinary.com/v1_1/dtrc9ii8d/image/upload', formData, {

                });

                console.log('Cloudinary response:', res.data);

                const imageUrl = res.data.secure_url;
                console.log('Image URL:', imageUrl);
                updateProfilePicture(imageUrl);

            } catch (error) {
                console.error('Error uploading image:', error);
                if (error.response) {
                    console.error('Error details from Cloudinary:', error.response.data);
                }
                alert('Error uploading image');
            }

        }

    };
    useEffect(() => {
        const getProfile = async () => {
            const token = localStorage.getItem('token');
            console.log('Token:', token);



            try {
                const response = await axios.get('http://localhost:5000/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Response data:', response.data);
                setProfile(response.data);
            } catch (error) {
                console.log('Error:', error.response?.data || error.message);
            }
        }
        getProfile();
    }, []);
    useEffect(() => {
        const getOrdersByUserId = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders/orderUser', {
                    headers: {
                        Authorization: `Bearer ${token}`,  
                    },
                });
                setOrders(response.data.allorders);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user orders:', error);
                setLoading(false);
            }
        };

        if (token) {
            getOrdersByUserId();
        } else {
            setLoading(false);
            console.error('No token found!');
        }
    }, [token]);
    const updateProfilePicture = async (imageUrl) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to update your profile picture.');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:5000/api/auth/profile',
                { img: imageUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Profile updated with new picture:', response.data);
            alert('Profile picture updated successfully!');
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert('Error updating profile picture');
        }
    };
    return (
        <div>
            <Navbar />
            <div
                style={{
                    backgroundColor: "#fff",
                    color: "#333",
                    minHeight: "100vh",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    padding: "15px",
                }}
            >
                <div
                    style={{
                        maxWidth: "1000px",
                        margin: "0 auto",
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                            marginBottom: "25px",
                            borderBottom: "1px solid #eee",
                            paddingBottom: "20px",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                border: "3px solid #FFD700",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f5f5f5",
                                color: "#FFD700",
                                fontSize: "28px",
                                fontWeight: "bold",
                                flexShrink: 0,
                            }}
                        >
                            {!imageError && profile?.img ? (
                                <img
                                    src={profile.img}
                                    alt="Profile"
                                    onError={() => setImageError(true)}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            ) : (
                                <span style={{ fontWeight: "bold", color: "#fff" }}>
                                    {profile?.Name?.slice(0, 2) || "JP"}
                                </span>
                            )}

                        </div>

                        <div>
                            <h1
                                style={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                    marginBottom: "4px",
                                    color: "#222",
                                }}
                            >
                                {profile ? profile.Name : "Loading..."}

                            </h1>
                            <p
                                style={{
                                    color: "#666",
                                    marginBottom: "8px",
                                }}
                            >
                                {profile ? profile.email : "Loading..."}

                            </p>
                            <input
                                type="file"
                                style={{
                                    display: "none",
                                }}
                                onChange={handleFileChange}
                                accept="image/*"
                                id="fileInput"
                            />

                            <label
                                htmlFor="fileInput"
                                style={{
                                    cursor: "pointer",
                                    fontSize: "0.875rem",
                                    color: "#1e293b",
                                    fontWeight: "500",
                                }}
                            >
                                Browse Picture
                            </label>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    flexWrap: "wrap",
                                }}
                            >
                                <span
                                    style={{
                                        backgroundColor: "#FFD700",
                                        color: "#000",
                                        padding: "4px 10px",
                                        borderRadius: "12px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    {profile ? profile.role : "Loading..."}

                                </span>
                                <span
                                    style={{
                                        color: "#666",
                                        fontSize: "14px",
                                    }}
                                >
                                    Member since {profile ? profile.createdAt : "Loading..."}

                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                                alignItems: "center",
                                flexWrap: "wrap",
                                gap: "10px",
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "18px",
                                    fontWeight: "600",
                                }}
                            >
                                Recent Orders
                            </h2>
                            <select
                                style={{
                                    padding: "8px 12px",
                                    border: "1px solid #ddd",
                                    borderRadius: "6px",
                                    backgroundColor: "#fff",
                                }}
                            >
                                <option>Last 30 days</option>
                                <option>Last 6 months</option>
                                <option>All orders</option>
                            </select>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                            }}
                        >
                            {orders.map((order) => (
                                <div
                                    key={order._id}
                                    style={{
                                        border: '1px solid #eee',
                                        borderRadius: '10px',
                                        padding: '15px',
                                        backgroundColor: '#fff',
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: '15px',
                                            flexWrap: 'wrap',
                                            gap: '10px',
                                        }}
                                    >
                                        <div>
                                            <div
                                                style={{
                                                    fontSize: '14px',
                                                    color: '#666',
                                                    marginBottom: '4px',
                                                }}
                                            >
                                                Order #{order._id}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                Placed on {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <span
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                                backgroundColor:
                                                    order.paymentStatus === 'Shipped' ? '#e6f7ff' : order.paymentStatus === 'Delivered' ? '#f6ffed' : '#fff3e0',
                                                color:
                                                    order.paymentStatus === 'Shipped'
                                                        ? '#1890ff'
                                                        : order.paymentStatus === 'Delivered'
                                                            ? '#52c41a'
                                                            : '#ff9900',
                                            }}
                                        >
                                            {order.paymentStatus}
                                        </span>
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '15px',
                                            borderTop: '1px solid #eee',
                                            paddingTop: '15px',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {order.items.map((item) => (
                                            <div
                                                key={item._id}
                                                style={{
                                                    display: 'flex',
                                                    gap: '15px',
                                                    flexWrap: 'wrap',
                                                    borderBottom: '1px solid #eee',
                                                    paddingBottom: '15px',
                                                    width: '100%',
                                                }}
                                            >
                                                <img
                                                    src={item.productId.img}
                                                    alt="Product"
                                                    style={{
                                                        width: '80px',
                                                        height: '80px',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        flexShrink: 0,
                                                    }}
                                                />
                                                <div style={{ flex: '1', minWidth: '200px' }}>
                                                    <div
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: '500',
                                                            marginBottom: '4px',
                                                        }}
                                                    >
                                                        {item.productId ? item.productId.ProductName : 'Product Name'}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: '14px',
                                                            color: '#666',
                                                            marginBottom: '8px',
                                                        }}
                                                    >
                                                        {item.productId ? `${item.productId.color} | Qty: ${item.quantity}` : `Qty: ${item.quantity}`}
                                                    </div>
                                                    <div
                                                        style={{
                                                            fontSize: '16px',
                                                            fontWeight: '600',
                                                            color: '#111',
                                                        }}
                                                    >
                                                        ${item.productId ? item.productId.price : 'N/A'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            borderTop: '1px solid #eee',
                                            paddingTop: '15px',
                                            marginTop: '15px',
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                color: '#111',
                                            }}
                                        >
                                            Total: ${order.totalAmount.toFixed(2)}
                                        </div>
                                        <div>
                                            <button
                                                style={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ddd',
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                    marginRight: '10px',
                                                }}
                                            >
                                                Track Order
                                            </button>
                                            <button
                                                style={{
                                                    backgroundColor: '#fff',
                                                    border: '1px solid #ddd',
                                                    padding: '8px 12px',
                                                    borderRadius: '6px',
                                                    fontSize: '14px',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                Buy Again
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <button
                            style={{
                                display: "block",
                                margin: "20px auto",
                                backgroundColor: "#FFD700",
                                color: "#000",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                cursor: "pointer",
                                fontWeight: "500",
                            }}
                        >
                            View All Orders
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile
