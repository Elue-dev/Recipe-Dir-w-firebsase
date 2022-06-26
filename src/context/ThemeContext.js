import { createContext, useContext, useReducer } from 'react'

export const ThemeContext = createContext()

export const useTheme = () => {
    return useContext(ThemeContext)
}

const themeReducer = (state, action) => {
    switch(action.type) {
        case 'CHANGE_COLOR' :
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload}
        default:
            return state
    }
}

export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: '#5b3b2ecd',
        mode: 'light'
    })

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color})
    }

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode})
    }

    const value = { ...state, changeColor, changeMode }
    
    return (
        <ThemeContext.Provider value={value}>
            { children }
        </ThemeContext.Provider>
    )
}