// src/components/Navbar.js
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation
import './Login.css';

const Navbar = () => {
    const location = useLocation();  // Get the location object

    // Retrieve userName from sessionStorage or location state
    const storedUserName = sessionStorage.getItem('userName');
    const userName = location.state?.name || storedUserName;

    useEffect(() => {
        // Store userName in sessionStorage if it comes from location state
        if (location.state?.name) {
            sessionStorage.setItem('userName', location.state.name);
        }
    }, [location.state]);

    return (
        <nav className="navbar">
            <div className="navbar-links">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/signup" className="navbar-link">Signup</Link>
                <Link to="/news" className="navbar-link">Exclusive News</Link>
            </div>

            <div className="navbar-user-info">
                {userName ? (
                    <span className="navbar-user-name">{`Welcome, ${userName}`}</span>
                ) : (
                    <span className="navbar-user-name">Welcome User</span>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
