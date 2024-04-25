import React from 'react';
import supabase from '../supabase';
import { useState } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({signedIn}) {
    const navigate = useNavigate();
    const onLogOut = async () => {
        const { error } = await supabase.auth.signOut();
        navigate('/');
        window.alert('Logged Out!');
    }

    if (!signedIn) {
        return (
            <nav className="navbar">
                <Link to="/" className="site-title">ArtHub</Link>
                <ul>
                    <li>
                        <Link to="/" className='nav-item'>Home</Link>
                    </li>
                    <li>
                        <Link to="/signin" className='nav-item'>Sign In</Link>
                    </li>
                </ul>
            </nav>
        )
    } else {
        return (
            <nav className="navbar">
                <Link to="/" className="site-title">ArtHub</Link>
                <ul>
                    <li>
                        <Link to="/" className='nav-item'>Home</Link>
                    </li>
                    <li>
                        <Link to="/createpost" className='nav-item'>Create Post</Link>
                    </li>
                    <li>
                        <Link onClick={onLogOut} className='nav-item'>Log Out</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar