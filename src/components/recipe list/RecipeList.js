import './RecipeList.css'
import { Link } from 'react-router-dom'
import { database } from '../../firebase'
import { deleteDoc, doc} from 'firebase/firestore'
import { MdDeleteForever } from 'react-icons/md'

export default function RecipeList({ recipes }) {
  if (recipes.length === 0) {
    return (
      <div className='error'>No recipes to load. <br /> 
        <Link to='/create'><b>Start adding some!</b></Link>
      </div>
    )
  }

  const handleDelete = (id) => {
    try {
      const docRef = doc(database, 'recipes', id)
      deleteDoc(docRef).then((doc) => {
        doc.reset()
      })
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className='recipe-list'>
        {recipes.map(recipe => (
            <div key={recipe.id} className='card'>
                <h3>{recipe.title}</h3>
                <p>{recipe.cookingTime} to make.</p>
                <div>{recipe.method.substring(0, 100)}...</div>
                <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
                <div onClick={() => handleDelete(recipe.id)}> <MdDeleteForever className='delete' /> </div>
            </div>
        ))}
    </div>
  )
}
