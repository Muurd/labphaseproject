import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Productmanagment() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [ProductName, setProductName] = useState('')
  const [color, setColor] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [gender, setGender] = useState('')
  const [size, setSize] = useState('')
  const [img, setImg] = useState('')
  const [description, setDescription] = useState('')
  const [Products, setProducts] = useState([])
  const [selectedId, setSelectedId] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const showProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/getProducts")
        console.log(res.data)
        setProducts(res.data.AllProducts)
      } catch (error) {
        console.log(error)
      }
    }
    showProducts();
  }, [])

  const addProduct = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      alert('Please upload an image.');
      return;
    }
    console.log("Image URL: ", selectedImage); 
  
    try {
      const response = await axios.post('http://localhost:5000/api/products', {
        ProductName,
        color,
        price,
        category,
        gender,
        size,
        img: selectedImage,  
        description,
      });
      console.log(response.data);
      alert('Product is added to the database');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Something went wrong');
      } else {
        alert('Error: Unable to reach the server');
      }
      console.error('Error details:', error);
    }
  };
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/deleteProduct/${productId}`);
      console.log(response.data);

      if (response.status === 200) {
        alert("Product has been deleted.");
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } else {
        alert("Sorry, couldn't delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("There was an error, could not delete the product.");
    }
  };
  const updateProduct = async (productId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/products/updateProduct/${productId}`,
        { ProductName, color, price, category, gender, size, img, description }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log(Products.img)
        alert("Product has been updated.");
        setProducts((prevProducts) => prevProducts.map((product) => product._id === productId ? { ...product, ProductName, color, price, category, gender, size, img, description } : product)
        );
      } else {
        alert("Sorry, couldn't update the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("There was an error, could not update the product.");
    }
  };
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
    if (showEditForm) setShowEditForm(false)
  }

  const toggleEditForm = () => {
    setShowEditForm(!showEditForm)
    if (showAddForm) setShowAddForm(false)
  }
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
        setSelectedImage(imageUrl); 
  
      } catch (error) {
        console.error('Error uploading image:', error);
        if (error.response) {
          console.error('Error details from Cloudinary:', error.response.data);
        }
        alert('Error uploading image');
      }
    }
};


  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleDrop = (e) => {
    e.preventDefault(); 
    const file = e.dataTransfer.files[0]; 
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  return (
    <div style={{ padding: "1.5rem", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1e293b", marginBottom: "0.5rem" }}>
          Product Management
        </h1>
        <p style={{ color: "#64748b", fontSize: "0.875rem" }}>Manage your product inventory</p>
      </header>
      <div style={{ marginBottom: "2rem" }}>
        <button
          onClick={() => {
            toggleAddForm();
            setProductName('')
            setPrice('')
            setColor('')
            setSize('')
            setGender()
            setDescription('')
          }}
          style={{
            backgroundColor: "#1e293b",
            color: "white",
            border: "none",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
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
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Product
        </button>
      </div>
      {showAddForm && (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", margin: "0" }}>Add New Product</h2>
            <button
              onClick={toggleAddForm}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#64748b",
                display: "flex",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                style={{
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                }} value={ProductName} onChange={(e) => { setProductName(e.target.value) }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Price ($)</label>
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                style={{
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                }} value={price} onChange={(e) => { setPrice(e.target.value) }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Category</label>
              <select
                style={{
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }} value={category} onChange={(e) => { setCategory(e.target.value) }}
              >
                <option value="">Select category</option>
                <option value="clothing">Clothing</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Color</label>
              <input
                type="text"
                placeholder="Enter color"
                style={{
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                }} value={color} onChange={(e) => { setColor(e.target.value) }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Gender</label>
              <select
                style={{
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }} value={gender} onChange={(e) => { setGender(e.target.value) }}
              >
                <option value="">Select gender</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Size</label>
              <select
                style={{
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  backgroundColor: "white",
                }} value={size} onChange={(e) => { setSize(e.target.value) }}
              >
                <option value="">Select size</option>
                <option value="xs">XS</option>
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
              </select>
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1e293b",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Product Description
              </label>
              <textarea
                placeholder="Enter product description"
                rows={4}
                style={{
                  width: "100%",
                  padding: "0.625rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #e2e8f0",
                  fontSize: "0.875rem",
                  resize: "vertical",
                }} value={description} onChange={(e) => { setDescription(e.target.value) }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#1e293b",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Product Image
              </label>
              <div
                style={{
                  border: "2px dashed #e2e8f0",
                  borderRadius: "0.375rem",
                  padding: "2rem",
                  textAlign: "center",
                  backgroundColor: "#f8fafc",
                }} onDragOver={handleDragOver} onDrop={handleDrop}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: "0 auto 0.5rem", color: "#64748b" }}
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                  <line x1="16" y1="5" x2="22" y2="5"></line>
                  <line x1="19" y1="2" x2="19" y2="8"></line>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0" }}>
                  Drag and drop an image or <span style={{ color: "#1e293b", fontWeight: "500" }}>browse</span>
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
                  Browse
                </label>
                {selectedImage && (
                  <div style={{ marginTop: "1rem" }}>
                    <img
                      src={selectedImage}
                      alt="Selected Product"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                type="button"
                style={{
                  backgroundColor: "#1e293b",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }} onClick={addProduct}
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={toggleAddForm}
                style={{
                  backgroundColor: "transparent",
                  color: "#64748b",
                  border: "1px solid #e2e8f0",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
            minWidth: "700px",
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
                Image
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Name
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Price
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Category
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Color
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Gender
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Size
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "0.75rem 1rem",
                  color: "#64748b",
                  fontWeight: "500",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product) => (
              <tr key={product._id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={product.img || "/placeholder.svg?height=40&width=40"}
                      alt={product.ProductName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                </td>
              <td style={{ padding: "0.75rem 1rem", color: "#1e293b", fontWeight: "500" }}>
                {product.ProductName ? product.ProductName.toUpperCase() : 'N/A'}
              </td>
              <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                ${product.price != null ? parseFloat(product.price).toFixed(2) : 'N/A'}
              </td>

              <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                {product.category ? product.category.toUpperCase() : 'N/A'}
              </td>
              <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                {product.color ? product.color.toUpperCase() : 'N/A'}
              </td>
              <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                {product.gender ? product.gender.toUpperCase() : 'N/A'}
              </td>
              <td style={{ padding: "0.75rem 1rem", color: "#1e293b" }}>
                {product.size ? product.size.toUpperCase() : 'N/A'}
              </td>

                <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                  <div
                    style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}
                  >
                    <button
                      onClick={() => {
                        toggleEditForm(product);
                        setSelectedId(product._id);
                        setProductName(product.ProductName)
                        setPrice(product.price)
                        setColor(product.color)
                        setSize(product.size)
                        setGender(product.gender)
                        setDescription(product.description)
                        setImg(product.img)
                      }}
                      style={{
                        backgroundColor: "#f1f5f9",
                        border: "none",
                        borderRadius: "0.25rem",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                        style={{ color: "#0ea5e9" }}
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                    </button>
                    <button
                      style={{
                        backgroundColor: "#f1f5f9",
                        border: "none",
                        borderRadius: "0.25rem",
                        width: "32px",
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }} onClick={() => { deleteProduct(product._id); }}
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
                        style={{ color: "#ef4444" }}
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEditForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "0.5rem",
              padding: "1.5rem",
              width: "100%",
              maxWidth: "800px",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}
            >
              <h2 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", margin: "0" }}>Edit Product</h2>
              <button
                onClick={toggleEditForm}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                  display: "flex",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <form
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Product Name</label>
                <input
                  type="text"
                  style={{
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                  }} value={ProductName} onChange={(e) => { setProductName(e.target.value) }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  style={{
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                  }} value={price} onChange={(e) => { setPrice(e.target.value) }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Category</label>
                <select
                  style={{
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }} value={category} onChange={(e) => { setCategory(e.target.value) }}
                >
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Color</label>
                <input
                  type="text"
                  style={{
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                  }} value={color} onChange={(e) => { setColor(e.target.value) }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Gender</label>
                <select
                  style={{
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }} value={gender} onChange={(e) => { setGender(e.target.value) }}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.875rem", fontWeight: "500", color: "#1e293b" }}>Size</label>
                <select
                  style={{
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    backgroundColor: "white",
                  }} value={size} onChange={(e) => { setSize(e.target.value) }}
                >
                  <option value="xs">XS</option>
                  <option value="s">S</option>
                  <option value="m">M</option>
                  <option value="l">L</option>
                  <option value="xl">XL</option>
                  <option value="xxl">XXL</option>
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1e293b",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Product Description
                </label>
                <textarea
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.625rem",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                    fontSize: "0.875rem",
                    resize: "vertical",
                  }} value={description} onChange={(e) => { setDescription(e.target.value) }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "#1e293b",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Product Image
                </label>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "0.25rem",
                      backgroundColor: "#f1f5f9",
                      overflow: "hidden",
                    }} onDragOver={handleDragOver} onDrop={handleDrop}
                  >
                    <img
                      src={selectedImage}
                      alt="Product"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div
                    style={{
                      flex: "1",
                      border: "2px dashed #e2e8f0",
                      borderRadius: "0.375rem",
                      padding: "1rem",
                      textAlign: "center",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <p style={{ fontSize: "0.875rem", color: "#64748b", margin: "0" }}>
                      Drag and drop to replace or <span style={{ color: "#1e293b", fontWeight: "500" }}>browse</span>
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
                  Browse
                </label>
                {selectedImage && (
                  <div style={{ marginTop: "1rem" }}>
                    <img
                      src={selectedImage}
                      alt="Selected Product"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  </div>
                )}
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#1e293b",
                    color: "white",
                    border: "none",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }} onClick={() => { updateProduct(selectedId); }}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={toggleEditForm}
                  style={{
                    backgroundColor: "transparent",
                    color: "#64748b",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem 1.5rem",
                    borderRadius: "0.375rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Productmanagment
