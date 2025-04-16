import React, { useState } from 'react'
import loginBackground from '../assets/loginBackground.jpeg';
import styles from '../pages/Signup.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
function Signup() {
    const [Name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
    const handleclick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { Name, email, password })
            console.log(response.data)
            navigate('/')
        } catch (error) {
            alert(error.response.data.message);
        }
    }



    return (
        <div style={{ display: 'flex', height: '100vh' }}>

            <div style={{ width: '50%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <div className={styles['form-box']}>
                    <form className={styles['form']} onSubmit={handleclick}>
                        <span className={styles['title']}>Sign up</span>
                        <span className={styles['subtitle']}>Create a free account with your email.</span>
                        <div className={styles['form-container']}>
                            <input type="text" className={styles['input']} placeholder="Full Name" value={Name} onChange={(e)=>{setName(e.target.value)}} />
                            <input type="email" className={styles['input']} placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                            <input type="password" className={styles['input']} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        </div>
                        <button type='submit'>Sign up</button>
                    </form>
                    <div className={styles['form-section']}>
                        <p>Have an account? <Link to='/login'>Login</Link> </p>
                    </div>
                </div>
            </div>


            <div style={{ width: '60%', height: '100%', backgroundImage: `url(${loginBackground})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <p style={{ color: 'white' }}>Welcome To Trendify</p>
            </div>
        </div>
    )
}

export default Signup
