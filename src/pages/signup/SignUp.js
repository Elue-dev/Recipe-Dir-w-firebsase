import { useState, useRef } from 'react'
import './SignUp.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { RiErrorWarningFill } from 'react-icons/ri'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, user } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { color, mode }  = useTheme()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        if(passwordRef.current.value.length > 9) {
            return setError('Password must be between 6-9 characters')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate('/create')
        } catch (err){
            if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
                setError('Email already in use')
            }
            if (err.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setError('Password should be at least 6 characters')
            }
            if (err.message === 'Firebase: Error (auth/invalid-email).') {
                setError('Invalid email')
            }
            if (err.message === 'Firebase: Error (auth/network-request-failed).') {
                setError('Please check your internet connection')
            }
        }

        setLoading(false)
    }

  return (
    <div className={`signup ${mode}`}>
        <h2 className='title'>Sign Up</h2>
        {error && <p className='error'> <RiErrorWarningFill className='error-icon' />{error}</p>}
        <form onSubmit={handleSubmit} autoComplete='on'>
            <label>
                <span>Email</span>
                    <input type='email' ref={emailRef} required placeholder='e.g example@gmail.com'/>
            </label>

            <label>
                <span>Password</span>
                    <input type='password' ref={passwordRef} required  placeholder='Enter a strong password'/>
            </label>

            <label>
                <span>Confirm Password</span>
                    <input type='password' ref={passwordConfirmRef} required placeholder='Confirm your password' />
            </label>

            <button className='btn' style={{background: color}} disabled={loading} type='submit'>Sign Up</button>
        </form>
        <div className='switch'>
            Already have an account? <Link style={{ color: color}} to='/login'>Login</Link>
         </div>
    </div>
  )
}
