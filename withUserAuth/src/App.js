import React from 'react'
import './App.css'



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './Pages/page_components/Header'
import HomePage from './Pages/HomePage'
import LoginPage from './Pages/LoginPage'

import PrivateRoute from './Context/Utils/PrivateRoute'
import { AuthProvider } from './Context/AuthContext'


const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Header/>
                <Routes>
                    <Route element={<PrivateRoute><HomePage /></PrivateRoute>} path='/' exact />
                    <Route element={<LoginPage />} path='/login' />
                </Routes>
            </AuthProvider>
        </Router>
    )
}
export default App