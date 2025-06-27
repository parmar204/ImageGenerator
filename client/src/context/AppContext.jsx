import {createContext, useContext, useState} from "react"
import { useNavigate } from "react-router-dom"

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    return (
        <AppContext.Provider value={{user, setUser, navigate, showLogin, setShowLogin}}>{children}</AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
} 