import { useEffect, useState } from 'react'
import './Home.css'
import RecipeList from '../../components/recipe list/RecipeList'
import { database } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Home() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)

    // const colRef = collection(database, 'recipes') //reference to a specific collection (collection reference) in our case 'recipes'
    //   getDocs(colRef).then((snapshot) => { //get collection data
    //     if (snapshot.empty) {
    //       setError('No recipes to load')
    //       setIsPending(false)
    //     } else {
    //       let results = []
    //       snapshot.docs.forEach(doc => {
    //         results.push({ id: doc.id, ...doc.data() })
    //       })

    //       setData(results)
    //       setIsPending(false)
    //     }
    // }).catch(err => {
    //   setError(err.message)
    //   setIsPending(false)
    // })

    //real time collection data, the one above is just collecting the data without listening to the database changes
    const colRef = collection(database, 'recipes')
    onSnapshot(colRef, (snapshot) => { //the function(2nd argument) will fire everytime there is a change in the collection and it sends back a new snapshot
      let results = []
          snapshot.docs.forEach(doc => {
            results.push({ id: doc.id, ...doc.data() })
          })
          setData(results)
          setIsPending(false)
    })
  }, [])
  
  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <p className='loading'>loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
