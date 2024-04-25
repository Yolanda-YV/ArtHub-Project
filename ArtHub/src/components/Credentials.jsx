import React from 'react';

function Credentials({newUser, onSubmit}) {
    return (
        <form className='credentials' onSubmit={onSubmit}>
            {newUser ? (<input type='text' placeholder='Username'></input>) : null}
            <input type='email' placeholder='Email'></input>
            <input type='password' placeholder='Password'></input>
            <button type='submit'>{newUser ? 'Sign Up' : 'Log In'}</button>
        </form>
    );
}

export default Credentials;