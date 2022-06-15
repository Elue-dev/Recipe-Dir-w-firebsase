import { useEffect, useState } from 'react'
import './Home.css'
import RecipeList from '../../components/recipe list/RecipeList'
import { database } from '../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)

    //real time collection data, the other way just collects the data without listening to the database changes
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
      {isPending && <p className='loading'>loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}
