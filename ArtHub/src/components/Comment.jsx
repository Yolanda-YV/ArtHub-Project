import React from 'react';
import { useState } from 'react';
import '../index.css';

function Comment({username, comment, date}) {
    

    return (
        <div className='comment'>
            <h3>{username}</h3>
            <p>{comment}</p>
            <p>{date}</p>
        </div>
    );
}

export default Comment;