import { useLogout } from '../hooks/useLogout'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext';

export default function NavBar() {
    const logout = useLogout();
    const { user } = useAuthContext();

    return (
        <nav className='bg-blue-700'>
            <ul className='flex gap-8 p-8 items-center text-2xl ml-10 mr-10'>
                <li className='flex-1 text-5xl font-bold text-white font-serif'>Tasks</li>
                <NavLink to="/">
                    <li className='p-2 font-bold'> Home </li>
                </NavLink>
                <NavLink to="/about">
                    <li className='p-2 font-bold'> About </li>
                </NavLink>
                {!user && <NavLink to="/signup">
                    <li className='p-2 font-bold'> Sign Up </li>
                </NavLink>}
                {!user && <NavLink to="/login">
                    <li className='p-2 font-bold'> Log In </li>
                </NavLink>}
                {user && <h1>{user.username}</h1>}
                {user && <button onClick={logout} className='p-2 font-bold'>Logout</button>}
            </ul>
        </nav>
    )
}
