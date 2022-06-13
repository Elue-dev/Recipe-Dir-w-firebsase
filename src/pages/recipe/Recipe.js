import { useEffect, useState } from 'react'
import './Recipe.css'
import {  useParams } from 'react-router-dom'
import { doc, onSnapshot } from 'firebase/firestore'
import { database } from '../../firebase'

export default function Recipe() {
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setIsPending(true)

    try {
      const docRef = doc(database, 'recipes', id)
      onSnapshot(docRef, (doc) => {
        setRecipe(doc.data())
        setIsPending(false)
      })
    } catch {
      setError('Could not find that recipe')
      setIsPending(false)
    }
  }, [id])

  return (
    <div className='recipe'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && (
        <>
          <h2 className='page-title'>{recipe.title}.</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>``
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className='method'>{recipe.method}</p>
        </>
      )}
    </div>
  )
}