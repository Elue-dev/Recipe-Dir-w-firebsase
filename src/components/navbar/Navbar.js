import './Navbar.css'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import Searchbar from '../search bar/Searchbar'

export default function Navbar() {

  const { color } = useTheme()

  return (
    <div className='navbar' style={{ background: color}}>
        <nav>
            <Link to='/' className='brand'>
                <h1>Cooking Ninja</h1>
            </Link>
            {/* <Searchbar /> */}
            <Link to='/create'> 
                Add a Recipe
            </Link>
        </nav>
    </div>
  )
}
