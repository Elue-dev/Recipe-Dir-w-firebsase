import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import './Welcome.css'

export default function Welcome() {
    const [error, setError] = useState('')
    const { user, logout } = useAuth()
    const { mode } = useTheme()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')
    
        try {
            await logout()
            navigate('/')
        }  catch(err) {
            setError(err.messsge)
        }
    }

  return (
    <div className={`welcome-user ${mode}`}>
        {error && <p className='error'>{error}</p>}
        {user && <p className='welcome'>Welcome, <b>{user.email}!</b></p>}
        { user && <p onClick={handleLogout} className='logout'>Log Out</p>}
    </div>
  )
}
