import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'

import './header.css'

const Header = () => {
    const {user, logoutUser} = useContext(AuthContext)
    return (
        <div className='header'>
            
            <h3 className='project'>Django DRF React</h3>
            <div className='link'>
                {user && <a>{user.username}</a>}
                <Link className='link' to='/'>Home</Link>
                {user ? 
                (<a onClick={logoutUser} className='link' to='/logout'>Logout</a>
                ) : 
                (<Link className='link' to='/login'>Login</Link>)}
            </div>
        </div>
    )
}


export default Header