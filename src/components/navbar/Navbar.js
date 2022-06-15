import { useState } from 'react'
import './Navbar.css'
import { useTheme } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Searchbar from '../search bar/Searchbar'

export default function Navbar() {

  const { color } = useTheme()
  const { user, logout } = useAuth()
  const [error, setError] = useState()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
        await logout()
        navigate('/login')
    }  catch(err) {
        setError(err.messsge)
    }
}

  return (
    <div className='navbar' style={{ background: color}}>
        <nav>
            <Link to='/' className='brand'>
                <h1>Cooking Ninja</h1>
            </Link>
            {/* <Searchbar /> */}
            {user && <p className='welcome'>Welcome, {user.email}</p>}
            { user && <p onClick={handleLogout} className='logout'>Log Out</p>}
            <Link to='/create'> 
                Create Recipe
            </Link>
        </nav>
    </div>
  )
}
