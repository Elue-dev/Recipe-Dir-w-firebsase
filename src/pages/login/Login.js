import { useState, useRef} from 'react'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import GoogleButton from 'react-google-button'
import { useTheme } from '../../context/ThemeContext'
import { RiErrorWarningFill } from 'react-icons/ri'
import { useAlert } from 'react-alert'

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, googleSignIn, githubSignIn } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { color, mode } = useTheme()
    const alert = useAlert()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/create')
            alert.show('Successfully logged in', {type: 'success'})
        } catch (err){
            if (err.message === 'Firebase: Error (auth/user-not-found).') {
                setError('User not found')
            }
            if (err.message === 'Firebase: Error (auth/wrong-password).') {
                setError('Wrong password')
            }
            if (err.message === 'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).') {
                setError('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later')
            }
        }
        setLoading(false)
    }

    async function handleGoogleSignIn(e) {
        e.preventDefault()

        try {
            await googleSignIn()
            navigate('/create')
            alert.show('Successfully logged in', {type: 'success'})
        } catch(err) {
            setError(err.messasge)
        }
    }

  return (
        <div className={`login ${mode}`}>
            <h2 className='title'>Log In</h2>
            {error && <p className='error'><RiErrorWarningFill className='error-icon' /> {error}</p>}
            <GoogleButton style={{ width: '90%', marginLeft: '1rem'}} type='dark' onClick={handleGoogleSignIn} />
            <form onSubmit={handleSubmit} autoComplete='on'>
                <label>
                    <span>Email</span>
                    <input type='email' ref={emailRef} required placeholder='Enter your email' />
                </label>

                <label>
                    <span>Password</span>
                    <input type='password' ref={passwordRef} required placeholder='Enter your password' />
                </label>

                <button className='btn' style={{background: color}} disabled={loading}>Log In</button>

                <Link to='/forgot-password' className='forgot' style={{ color: color}}>Forgot Password?</Link>
            </form>
            
            <div>
            <p className='switch'>Don't have an account? <Link style={{ color: color}} to='/signup'>Sign Up</Link></p>
         </div> 
        </div>
  )
}