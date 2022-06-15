import { useState, useRef} from 'react'
import './ForgotPassword.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { RiErrorWarningFill } from 'react-icons/ri'

export default function Login() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { color, mode } = useTheme()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for further instructions (Ensure to check spam folder)')
            window.setTimeout(() => {
              navigate('/login')
          }, 4000)
        } catch (err){
          if (err.message === 'Firebase: Error (auth/user-not-found).') {
            setError('This email is not registered')
          }
          if (err.message === 'Firebase: Error (auth/invalid-email).') {
            setError('Invalid email')
          }
        }

        setLoading(false)
    }

  return (
        <div className={`login ${mode}`}>
            <h2 className='title'>Password Reset</h2>
            {error && <p className='error'><RiErrorWarningFill className='error-icon' />{error}</p>}
            {message && <p className='message'>{message}</p>}
            <form onSubmit={handleSubmit} autoComplete='on'>
                <label>
                    <span>Email</span>
                    <input type='email' ref={emailRef} required placeholder='Enter your email' />
                </label>

                <button className='btn' style={{background: color}} disabled={loading}>Reset Password</button>

                <Link to='/login' className='forgot' style={{ color: color}}>Login</Link>
            </form>
            
            <div>
            <p className='switch'>Don't have an account? <Link style={{ color: color}} to='/signup'>Sign Up</Link></p>
         </div> 
        </div>
  )
}