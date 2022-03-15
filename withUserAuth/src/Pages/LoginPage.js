import React, { useContext } from 'react'

import './pages.css'


import AuthContext from '../Context/AuthContext'


const LoginPage = () => {
    const {loginUser} = useContext(AuthContext)

    return (
        <div className='login'>
            
            <form className='form-login' onSubmit={loginUser}>
                <h1>LoginPage</h1>
                <hr />

                <label id='username'>Username: </label>
                <input type='text' name='username' placeholder='username' />
                <label id='password'>Password: </label>
                <input type='password' name='password' placeholder='password' />
                <input id='submit' type='submit' name='submit' value='Submit' />
            </form>
        </div>
    )
}

export default LoginPage