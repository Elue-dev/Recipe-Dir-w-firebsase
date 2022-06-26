import { useState, useRef } from 'react'
import './Create.css'
import { useNavigate } from 'react-router-dom'
import { database } from '../../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useTheme } from '../../context/ThemeContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [error, setError] = useState(false)
  const ingredientInput = useRef(null)
  const navigate = useNavigate()

  const { color, mode } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const doc = ({ title, ingredients, method, cookingTime: cookingTime + 'minutes'})

    if ([])

    try {
      const colRef = collection(database, 'recipes')
      await addDoc(colRef, doc)
      toast.success('Recipe has been added', {autoClose: 3000})
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()

    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current.focus()
  }

  return (
    <div className={`create ${mode}`}>
      <h2 className='page-title'>Add a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title</span>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className='ingredients'>
            <input
              type='text'
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              ref={ingredientInput}
            />
            <button className='add-btn' style={{background: color}} onClick={handleAdd}>add</button>
          </div>
        </label>
        {ingredients.map(i => <em key={i}>{i}, </em>)}

        <label>
          <span>Recipe Method</span>
          <textarea
            type='text'
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time</span>
          <input
            type='number'
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className='btn' style={{background: color}}>Submit</button>
      </form>
    </div>
  )
}
