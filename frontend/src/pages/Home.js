import React from 'react'
import Navbar from '../components/Navbar'
import shoesCollectionbg from '../assets/shoesCollection.jpg'
import pantsCollectionbg from '../assets/pantsCollection.jpg'
import shirtsCollectionbg from '../assets/shirtscollection.jpg'
import Homemainbg from '../assets/Homebgmain.jpg'
import Footer from '../components/Footer'
import FeaturedProducts from '../components/FeaturedProducts'
import oldmoneyman from '../assets/oldmoneymen.jpg'
import oldmoneywomen from '../assets/oldmoneywomen.jpg'
import aboutus from '../assets/aboutus.jpg'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar />
      <div style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundImage: `url('${Homemainbg}')`,
        backgroundSize:'cover',
        backgroundPosition:'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/placeholder.svg?height=800&width=1600")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          mixBlendMode: 'overlay'
        }} />
        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '96px 16px',
        }}>
          <div style={{
            maxWidth: '768px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h1 style={{
              marginBottom: '24px',
              fontSize: '2.25rem',
              fontWeight: 'bold',
              letterSpacing: '-0.025em',
              color: 'white',
              lineHeight: 1.2
            }}>
              <span style={{ display: 'block' }}>Discover Your Style</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(to right, #D4AF37,#D4AF37)', 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent'
              }}>Elevate Your Everyday</span>
            </h1>
            <p style={{
              margin: '24px auto 0',
              maxWidth: '36rem',
              fontSize: '1.125rem',
              color: '#d1d5db'
            }}>
              Curated collections of premium products designed to transform your lifestyle.
              Shop the latest trends with confidence and express your unique style.
            </p>
            <div style={{
              marginTop: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px'
            }}>
              <button style={{
                backgroundColor: '#D4AF37', 
                color: 'white',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                border: 'none',
                transition: 'background-color 0.2s'
              }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D4AF37'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = ' #D4AF37'} onClick={()=>{navigate('/allproducts')}}>
                Shop Now
              </button>
              <a href="/about" style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                color: 'white',
                textDecoration: 'none'
              }} onMouseOver={(e) => e.currentTarget.style.color = '#a7f3d0'}
                onMouseOut={(e) => e.currentTarget.style.color = 'white'}>
                Our Story <span style={{ marginLeft: '4px' }}>→</span>
              </a>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '96px',
          background: 'linear-gradient(to top, white, transparent)'
        }} />
      </div>
      <div style={{
        width: '100%',
        padding: '60px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '40px',
            color: '#333'
          }}>
            Shop Our Collections
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'relative',
              width: 'calc(33.333% - 14px)',
              minWidth: '300px',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: '#1a1a1a',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url('${shoesCollectionbg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
              }} />

              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: '30px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Footwear Collection
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  color: 'white',
                  textAlign: 'center',
                  maxWidth: '90%'
                }}>
                  Step into style with our premium selection of shoes for every occasion
                </p>
                <button style={{
                  backgroundColor: ' #D4AF37',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  width: 'auto',
                  display: 'inline-block'
                }} onClick={()=>{navigate('/allproducts')}}>
                  Shop Shoes
                </button>
              </div>
            </div>
            <div style={{
              position: 'relative',
              width: 'calc(33.333% - 14px)',
              minWidth: '300px',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: '#1a1a1a',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url('${pantsCollectionbg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
              }} />
              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: '30px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Pants Collection
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  color: 'white',
                  textAlign: 'center',
                  maxWidth: '90%'
                }}>
                  From casual to formal, find the perfect fit for your lifestyle
                </p>
                <button style={{
                  backgroundColor: ' #D4AF37',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  width: 'auto',
                  display: 'inline-block'
                }} onClick={()=>{navigate('/allproducts')}}>
                  Shop Pants
                </button>
              </div>
            </div>
            <div style={{
              position: 'relative',
              width: 'calc(33.333% - 14px)',
              minWidth: '300px',
              height: '400px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              backgroundColor: '#1a1a1a',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url('${shirtsCollectionbg}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 1
              }} />
              <div style={{
                position: 'relative',
                zIndex: 2,
                padding: '30px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2), transparent)',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  Shirts Collection
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  marginBottom: '15px',
                  color: 'white',
                  textAlign: 'center',
                  maxWidth: '90%'
                }}>
                  Express yourself with our diverse range of stylish tops and shirts
                </p>
                <button style={{
                  backgroundColor: ' #D4AF37',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  width: 'auto',
                  display: 'inline-block'
                }} onClick={()=>{navigate('/allproducts')}}>
                  Shop Shirts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ padding: "3rem 1rem", backgroundColor: "#3C3D37", fontFamily: "system-ui, -apple-system, sans-serif",boxShadow: "0 -8px 24px rgba(0, 0, 0, 0.6), 0 -6px 12px rgba(0, 0, 0, 0.5)"

        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              position: "relative",
              display: "inline-block",
            }}
          >
            <span style={{ color: "#333" }}>Man</span> & <span style={{ color: "#333" }}>Woman</span>{" "}
            <span style={{ color: "#555" }}>Collection</span>
          </h2>
          <div
            style={{
              width: "80px",
              height: "4px",
              background: "linear-gradient(to right, #333, #777)",
              margin: "0.75rem auto",
              borderRadius: "2px",
            }}
          ></div>
          <p style={{ color: "#666", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Discover our exclusive selection for both men and women
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            padding: "1rem",
            minHeight: "400px",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "350px",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }} onClick={()=>{navigate('/allproducts/men')}}
            className="hover:transform hover:scale-105 hover:shadow-xl"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/placeholder.svg?height=350&width=400')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.85)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${oldmoneyman}')`,
                backgroundSize:'cover',
                backgroundPosition:'center'
              }}
            ></div>
            <div style={{ position: "absolute", bottom: "0", left: "0", padding: "2rem", color: "white", width: "100%" }}>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Men</h3>
              <p style={{ fontSize: "1rem", opacity: "0.9", marginBottom: "1rem" }}>Explore men's collection</p>
              <div style={{ width: "50px", height: "4px", backgroundColor: "white", borderRadius: "2px" }}></div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              height: "350px",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }} onClick={()=>{navigate('/allproducts/women')}}
            className="hover:transform hover:scale-105 hover:shadow-xl"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url('${oldmoneywomen}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "brightness(0.85)",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)",
              }}
            ></div>
            <div style={{ position: "absolute", bottom: "0", left: "0", padding: "2rem", color: "white", width: "100%" }}>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Women</h3>
              <p style={{ fontSize: "1rem", opacity: "0.9", marginBottom: "1rem" }}>Explore women's collection</p>
              <div style={{ width: "50px", height: "4px", backgroundColor: "white", borderRadius: "2px" }}></div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "5rem", padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage: `url('${aboutus}')`,
                      backgroundSize:'cover',
                      backgroundPosition:'center'
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-20px",
                    right: "-20px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "12px",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontSize: "1rem", fontWeight: "bold", textAlign: "center", padding: "1rem" }}>
                    EST.
                    <br />
                    2010
                  </div>
                </div>
              </div>
            </div>

            <div style={{ flex: "1 1 400px" }}>
              <h2 style={{ fontSize: "2.2rem", fontWeight: "700", marginBottom: "1.5rem", position: "relative" }}>
                About Us
                <div
                  style={{
                    width: "60px",
                    height: "4px",
                    background: "linear-gradient(to right, #333, #777)",
                    marginTop: "0.75rem",
                    borderRadius: "2px",
                  }}
                ></div>
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                We are a premium fashion brand dedicated to providing high-quality clothing for both men and women. Our
                collections are designed with attention to detail, using sustainable materials and ethical manufacturing
                processes.
              </p>
              <p style={{ fontSize: "1.1rem", color: "#555", lineHeight: "1.8", marginBottom: "1.5rem" }}>
                Founded in 2010, we've grown from a small boutique to an international brand while maintaining our
                commitment to quality and customer satisfaction. Each piece in our collection is carefully crafted to
                ensure comfort, style, and durability.
              </p>
              <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                <div
                  style={{
                    padding: "1rem 2rem",
                    backgroundColor: "#333",
                    color: "white",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    display: "inline-block",
                  }}
                >
                  Learn More
                </div>
                <div
                  style={{
                    padding: "1rem 2rem",
                    border: "2px solid #333",
                    color: "#333",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    display: "inline-block",
                  }}
                >
                  Our Story
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts/>
      <Footer/>
    </div>

  )
}

export default Home
