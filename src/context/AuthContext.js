import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setlaoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    } 

    function logout() {
        return signOut(auth)
    } 

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function googleSignIn() {
        const googleAuthProvider =  new GoogleAuthProvider()
        return signInWithPopup(auth, googleAuthProvider)
    }
    

    useEffect(() => {
        const unsubscribe  = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setlaoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const values = { user, signup, login, logout, resetPassword, googleSignIn }

  return (
    <AuthContext.Provider value={values}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext