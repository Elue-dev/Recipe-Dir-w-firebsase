import './Navbar.css'
import { useTheme } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import Searchbar from '../search bar/Searchbar'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Navbar() {

  const { color } = useTheme()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleAlert = () => {
    if (!user) {
      toast.info('You must add an account to add a recipe', {autoClose: 3000, pauseOnFocusLoss: false})
      navigate('/login')
    } else {
      navigate('/create')
    }
  }

  return (
    <div className='navbar' style={{ background: color}}>
        <nav>
            <Link to='/' className='brand'>
                <h1>Recipe Dir.</h1>
            </Link>
            <Link to='/create' onClick={handleAlert}> 
                Add a Recipe
            </Link>
        </nav>
    </div>
  )
}
