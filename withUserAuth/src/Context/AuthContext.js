import React, { createContext, useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()
export default AuthContext


export const AuthProvider = ({children}) => {  
    const navigate = useNavigate()


    
    const [user, setUser] = useState(()=> localStorage.getItem('authToken') ? jwt_decode(localStorage.getItem('authToken')) : null)
    const [authToken, setAuthToken] = useState(()=> localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null)
    const [loading, setLoading] = useState(true)

    const loginUser = async(e) =>{
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        const data = await response.json()
        if (response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
            navigate('/')
        }
        else{
            alert('Something went wrong!!')
        }
    }

    const logoutUser = () =>{
        setAuthToken(null)
        setUser(null)
        localStorage.removeItem('authToken')
        navigate('/login')
    }
    

    const updateToken = async () =>{

        console.log('refresh')
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'refresh':authToken?.refresh})
        })

        const data = await response.json()
        if (response.status === 200){
            setAuthToken(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authToken', JSON.stringify(data))
        }else{
            logoutUser()
        }
        if (loading){
            setLoading(false)
        }
    }





    const contextData = {
        loginUser:loginUser,
        user:user,
        logoutUser: logoutUser,
        authToken, authToken
    }


    useEffect(()=> {
        const fourMinutes = 4 * 1000 * 60
        if (loading) {
            updateToken()
        }

        const interval = setInterval(()=>{
            if (authToken){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [authToken, loading])



    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider> 
    )
}