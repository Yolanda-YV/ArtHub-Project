import React from 'react';
import '../index.css';
import PostEdit from '../components/PostEdit';

function CreatePost() {
    return (
        <div className='create-post'>
            <h1>Create a New Post!</h1>
            <PostEdit />
        </div>
    );
}

export default CreatePost;