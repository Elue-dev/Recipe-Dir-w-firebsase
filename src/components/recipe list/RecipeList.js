import './RecipeList.css'
import { Link } from 'react-router-dom'
import { database } from '../../firebase'
import { deleteDoc, doc} from 'firebase/firestore'
import { MdDeleteForever } from 'react-icons/md'
import { useTheme } from '../../context/ThemeContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RecipeList({ recipes }) {
  const { color, mode } = useTheme()

  if (recipes.length === 0) {
    return (
      <div className={`empty ${mode}`}>No recipes to load <br /> 
        <Link className={mode} to='/create'><b>Start adding some!</b></Link>
      </div>
    )
  }

  const handleDelete = (id) => {
    try {
      const docRef = doc(database, 'recipes', id)
      deleteDoc(docRef).then((doc) => {
        doc.reset()
      })
      toast.success('Recipe has been removed', {autoClose: 3000, pauseOnFocusLoss: false})
    } catch(err) {
      console.log(err.message)
    }
  }
  return (
      <>
      <div className='recipe-list'>
          {recipes.map(recipe => (
              <div key={recipe.id} className={`card ${mode}`}>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.cookingTime} to make.</p>
                  <div>{recipe.method.substring(0, 100)}...</div>
                  <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                  <div style={{color: color}} onClick={() => handleDelete(recipe.id)}> <MdDeleteForever className='delete' /> </div>
              </div>
          ))}
      </div>
      <Link to='/create' style={{ color: color, textAlign: 'center'}}>Add More...</Link>
      </>
  )
}