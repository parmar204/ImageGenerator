import {createContext, useContext, useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

const AppContext = createContext()

export const AppProvider = ({children}) => {
    axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL
    const [user, setUser] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [credit, setCredit] = useState(false)

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`
            loadCreditData()
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [token])

    const loadCreditData = async () => {
        try {
            const {data} = await axios.get('/api/user/credits')
            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("failed to load credit data")
        }
    }

    const generateImage = async (prompt) => {
        try {
            const {data} = await axios.post('api/user/generate-image', {prompt})
            if (data.success) {
                loadCreditData()
                return data.imageUrl
            } else {
                toast.error(data.message)
                loadCreditData()
                if (data.creditBalance === 0) {
                    navigate('/buy-credit')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("failed to generate image")
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
    }

    return (
        <AppContext.Provider value={{user, setUser, navigate, showLogin, setShowLogin, token, setToken, credit, setCredit, loadCreditData, logout, generateImage}}>{children}</AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
} 

// axios.defaults.headers.common['Authorization'] = `${token}`