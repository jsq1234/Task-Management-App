import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
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
            </ul>
        </nav>
    )
}
