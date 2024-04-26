import React from 'react';
import supabase from '../supabase';
import { useState, useEffect } from 'react';
import '../index.css';
import { Link, useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
function Navbar({signedIn, user}) {
    const navigate = useNavigate();
    const [User, setUser] = useState(null);
    const onLogOut = async () => {
        // const { error } = await supabase.auth.signOut();
        // navigate('/');
        // window.alert('Logged Out!');
        supabase.auth.signOut();
    }
    useEffect(() => {
        if (signedIn && user) {
            try {
                setUser(user);
                console.log(user, user.user_metadata.display_name);
            } catch (error) {
                console.log(error);
                return
            }
        }
    }, [signedIn]);

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
                    <li>
                        <Link className='nav-item-nosel'>Hi {User ? User.user_metadata.display_name : 'User'}</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar