import { useEffect, useState } from 'react'
import './Search.css'
import { useLocation } from 'react-router-dom'
import RecipeList from '../../components/recipe list/RecipeList'
import { useTheme } from '../../context/ThemeContext'
import { database } from '../../firebase'
import { query, where, collection, onSnapshot } from 'firebase/firestore'

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const queryInput = queryParams.get('q')
  const { mode } = useTheme()
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(false)
  const [isPending, setIsPending] = useState(false)

    useEffect(() => {
      const queryResult = async () => {
        setIsPending(true)
          try {
            const colRef = collection(database, 'recipes')
            const queryDataBase = query(colRef, where('title', '==', queryInput))
            onSnapshot(queryDataBase, (snapshot) => {
              let results = []
                  snapshot.docs.forEach(doc => {
                    results.push({ id: doc.id, ...doc.data() })
                  })
                  setRecipe(results)  
            })
          } catch (err) {
            setError(err.message)
            setIsPending(false)
        }
      }
      queryResult()
      setIsPending(false)
    })

    

  return (
    <div>
      <h2 className={`page-title ${mode}`}>Recipes including <i>'{queryInput}'</i></h2>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>Loading...</p>}
      {recipe && <RecipeList recipes={recipe} />}
    </div>
  )
}
