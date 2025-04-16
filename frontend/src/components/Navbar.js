"use client"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Menu, ShoppingCart, X } from "lucide-react"
import axios from "axios"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [profile, setProfile] = useState(null);
  const [cartsCount,setCartsCount] = useState(0)
  const navigate = useNavigate()
  const animatedTexts = [
    "Free Shipping on Orders Over $50!",
    "New Summer Collection Available Now!",
    "Use Code WELCOME15 for 15% Off Your First Order!",
    "Limited Time Offer: Buy One Get One 50% Off!",
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % animatedTexts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [animatedTexts.length])
  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      const getCartItems = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/products/cart/get', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          })
          const cart = response.data.cart || [];
          console.log("Cart data:", cart);
          setCartsCount(cart.length); 
        } catch (error) {
          console.error(error)
        }
      }

      getCartItems(); 
    }
  }, [])
  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem("token")
      console.log("Token:", token)

      try {
        const response = await axios.get("http://localhost:5000/api/auth/user", {
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

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchClick = () => {
    const trimmed = searchQuery.trim()
    if (!trimmed) {
      alert("Enter a search term")
      return
    }

    navigate(`/allproducts?q=${encodeURIComponent(trimmed)}`)
  }

  return (
    <div>
      <div
        style={{
          background: "#000000",
          color: "white",
          width: "100%",
          overflow: "hidden",
          position: "relative",
          height: "40px", 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="animated-banner"
      >
        <div className="animated-text-container" style={{ position: "relative", height: "100%", width: "100%" }}>
          {animatedTexts.map((text, index) => (
            <div
              key={index}
              className={`animated-text ${index === currentTextIndex ? "active" : ""}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                fontWeight: "500",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
      <nav
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          padding: "15px 20px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "24px" }}>
          <Link to="/Home" style={{ textDecoration: "none", color: "#333" }}>
            Trendify
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "30px",
          }}
          className="desktop-nav"
        >
          <Link to="/Home" style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}>
            Home
          </Link>
          <Link to="/Allproducts" style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}>
            Products
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}>
            Contact
          </Link>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: 500,
            }}
          >
            <ShoppingCart size={20} />
            Cart({cartsCount})
          </Link>
          <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: "#555",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              className="category-link"
            >
              Admin panel
            </Link>
          <div className="profile-dropdown">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#333",
                fontWeight: "500",
              }}
              className="profile-button"
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundImage: `url(${profile ? profile.img : ""})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {profile ? profile.Name.slice(0, 2) : "JD"}
              </div>
              <span>Profile</span>
            </button>
            {isProfileOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  padding: "10px 0",
                  minWidth: "150px",
                  zIndex: 100,
                }}
                className="dropdown-menu"
              >
                <a
                  href="/profile"
                  style={{
                    display: "block",
                    padding: "8px 15px",
                    color: "#333",
                    textDecoration: "none",
                  }}
                  className="dropdown-item"
                >
                  My Account
                </a>
                <div style={{
                    display: "block",
                    padding: "8px 15px",
                    color: "#333",
                    textDecoration: "none",
                    cursor:'pointer'
                  }} onClick={()=>{navigate('/profile')}}>
                    My orders
                </div>
                <hr style={{ margin: "5px 0", borderColor: "#eee" }} />
                
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "none",
          }}
          className="mobile-menu-button"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            left: 0,
            right: 0,
            background: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 99,
          }}
        >
          <Link to="/home" style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}>
            Home
          </Link>
          <Link to="/allproducts" style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}>
            Products
          </Link>
          <Link to="/contact" style={{ textDecoration: "none", color: "#333", fontWeight: 500 }}>
            Contact
          </Link>
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#333",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "500",
            }}
          >
            <ShoppingCart size={20} />
            Cart({cartsCount})
          </Link>
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            My Account
          </Link>
          <Link
            to="/orders"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
            }}
          >
            My Orders
          </Link>
        </div>
      )}

      {/* Categories Section */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #eee",
          width: "100%",
          flexWrap: "wrap",
          gap: "15px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div className="category-links" style={{ display: "flex", gap: "40px" }}>
          <Link
            to="/Allproducts/men"
            style={{
              textDecoration: "none",
              color: "#555",
              fontWeight: 500,
              transition: "color 0.3s ease",
            }}
            className="category-link"
          >
            Men
          </Link>
          <Link
            to="/Allproducts/women"
            style={{
              textDecoration: "none",
              color: "#555",
              fontWeight: 500,
              transition: "color 0.3s ease",
            }}
            className="category-link"
          >
            Women
          </Link>
          {profile && profile.role === "Admin" && (
            <Link
              to="/admin"
              style={{
                textDecoration: "none",
                color: "#555",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              className="category-link"
            >
              Admin panel
            </Link>
          )}
        </div>

        <div
          className="search-container"
          style={{
            position: "relative",
            maxWidth: "300px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            style={{
              padding: "8px 15px",
              paddingRight: "40px",
              borderRadius: "20px",
              border: "1px solid #ddd",
              width: "100%",
              fontSize: "14px",
            }}
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555",
            }}
            onClick={handleSearchClick}
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
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .desktop-nav {
          display: flex;
          gap: 30px;
        }
        
        .mobile-menu-button {
          display: none;
        }
        
        .category-link:hover {
          color:rgb(133, 120, 30) !important;
        }
        
        .animated-text {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .animated-text.active {
          opacity: 1;
          transform: translateY(0);
        }

        .profile-dropdown {
          position: relative;
        }

        .dropdown-item:hover {
          background-color: #f5f5f5;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-button {
            display: block !important;
          }
          .search-container {
            max-width: 100%;
            order: 2;
            width: 100%;
            margin-top: 10px;
          }
          
          .category-links {
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
          }
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Navbar
