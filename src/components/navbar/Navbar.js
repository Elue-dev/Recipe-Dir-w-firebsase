import './Navbar.css'
import { useTheme } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from '../search bar/Searchbar'
import { useAlert } from 'react-alert'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {

  const { color } = useTheme()
  const alert = useAlert()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAlert= (n) => {
    if (!user) {
      alert.show('You must have an account to add a recipe', {type: 'info'})
      navigate('/login')
    } else {
      navigate('/create')
    }
  }

  return (
    <div className='navbar' style={{ background: color}}>
        <nav>
            <Link to='/' className='brand'>
                <h1>Recipe Dir</h1>
            </Link>
            <Link to='/create' onClick={handleAlert}> 
                Add a Recipe
            </Link>
        </nav>
    </div>
  )
}
