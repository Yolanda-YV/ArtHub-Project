import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Navbar() {
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
            </ul>
        </nav>
    )
}

export default Navbar