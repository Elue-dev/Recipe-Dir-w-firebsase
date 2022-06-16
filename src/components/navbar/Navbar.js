import './Navbar.css'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import Searchbar from '../search bar/Searchbar'
import { useAlert } from 'react-alert'

export default function Navbar() {

  const { color } = useTheme()
  const alert = useAlert()

  return (
    <div className='navbar' style={{ background: color}}>
        <nav>
            <Link to='/' className='brand'>
                <h1>Recipe Dir</h1>
            </Link>
            <Link to='/create' onClick={() => alert.show('You must have an account to add a recipe', {type: 'info'})}> 
                Add a Recipe
            </Link>
        </nav>
    </div>
  )
}
