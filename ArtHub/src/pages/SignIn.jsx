import React from 'react';
import supabase from '../supabase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../index.css';
import Credentials from '../components/Credentials';

function SignIn() {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        navigate('/');
        window.alert('Signed In!');
    };
    
    return (
        <div className='sign-page'>
            <h1>Sign in to an existing account</h1>
            <Credentials newUser={false} onSubmit={onSubmit}/>
            <div className='redirect-div'>
                <p>Don't have an account yet?</p>
                <button onClick={() => navigate('/signup')}>Sign Up</button>
            </div>
        </div>
    );
}

export default SignIn;