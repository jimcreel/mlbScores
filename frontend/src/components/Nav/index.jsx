import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'





export default function Nav (props) {
   const {loggedIn, setLoggedIn} = props

    function handleLogoutClick() {
        setLoggedIn(false)
    }
    function handleLoginClick() {
        localStorage.getItem('userToken') ? setLoggedIn(true) : setLoggedIn(false)
    }
    return (
        <nav className="bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
                <div className="flex-shrink-0">
                <Link to="/">
                    <h2 className="text-white font-bold text-2xl">MLB</h2>
                </Link>
                </div>
                <div className="flex-grow">
                <ul className="flex justify-end text-gray-300 text-lg font-medium">
                    {!loggedIn && (
                        <>
                            <li>
                            <Link to="/auth/signup">
                                <h4 className="px-3 py-2 hover:text-white">Sign Up</h4>
                            </Link>
                            </li>
                            <li>
                            <Link to="/auth/login">
                                <h4 className="px-3 py-2 hover:text-white">Log In</h4>
                            </Link>
                            </li>
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <li>
                            <Link to="/profile">
                                <h4 className="px-3 py-2 hover:text-white">Profile</h4>
                            </Link>
                            </li>
                            <li>
                            <Link to="/auth/logout" onClick={handleLogoutClick}>
                                <h4 className="px-3 py-2 hover:text-white">Log Out</h4>
                            </Link>
                            </li>
                        </>
                    )}
                </ul>
                </div>
            </div>
            </div>
        </nav>
    )
}