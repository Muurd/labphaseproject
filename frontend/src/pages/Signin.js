import React, { useState } from 'react'
import styles from '../pages/Signin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Signin() {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleclick = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            alert('You will be logged in as an Admin user for testing purposes')
            navigate('/home')
        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div className={styles['big-container']}>
            <div className={styles['form-container']}>
                <p className={styles['title']}>Login</p>
                <form className={styles['form']}>
                    <div className={styles['input-group']}>
                        <label htmlFor="username">Email</label>
                        <input type="text" name="Email" id="Email" placeholder="Enter Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </div>
                    <div className={styles['input-group']}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                        <div className={styles['forgot']}>
                            <p>Forgot password?</p>
                        </div>
                    </div>
                    <button className={styles['sign']} onClick={handleclick}>Sign in</button>
                </form>
                <div className={styles['social-message']}>
                    <div className={styles['line']}></div>
                    <p className={styles['message']}>Login with social accounts</p>
                    <div className={styles['line']}></div>
                </div>
                <div className={styles['social-icons']}>
                    <button aria-label="Log in with Google" className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        ></svg>
                    </button>
                    <button aria-label="Log in with Twitter" className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        ></svg>
                    </button>
                    <button aria-label="Log in with GitHub" className="icon">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        ></svg>
                    </button>
                </div>
                <p className={styles['signup']}>
                    Don't have an account?
                    <Link to='/register'>Signup</Link>
                </p>
            </div>
        </div>
    )
}

export default Signin
