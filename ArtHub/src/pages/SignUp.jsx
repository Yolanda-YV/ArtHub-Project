import React from 'react';
import supabase from '../supabase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../index.css';
import Credentials from '../components/Credentials';

function SignUp() {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        display_name: username,
                    }
                }
            })
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
        
        navigate('/');
        window.alert(`${username} Signed Up!`);
    };
    
    return (
        <div className='sign-page'>
            <h1>Create a new account</h1>
            <Credentials newUser={true} onSubmit={onSubmit}/>
            <div className='redirect-div'>
                <p>Already have an account?</p>
                <button onClick={() => navigate('/signin')}>Log In</button>
            </div>
        </div>
    );
}

export default SignUp;