import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './Welcome.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Welcome() {
    const [error, setError] = useState('')
    const { user, logout } = useAuth()
    const { mode, color } = useTheme()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')
    
        try {
            await logout()
            navigate('/')
            toast.success('Successfully logged out', {autoClose: 3000, pauseOnFocusLoss: false})
        }  catch(err) {
            setError(err.messsge)
        }
    }

  return (
    <div className={`welcome-user ${mode}`}>
        {!user && <Link to='/signup' style={{color: color, textDecoration: 'none', marginRight: '1rem'}}>Sign Up</Link>}
        {!user && <Link to='/login' style={{color: color, textDecoration: 'none'}}>Log In</Link>}
        {error && <p className='error'>{error}</p>}
        {user && <p className='welcome'>Welcome, <b>{user.email}!</b></p>}
        { user && <p onClick={handleLogout} className='logout'>Log Out</p>}
        <ToastContainer/>
    </div>
  )
}
