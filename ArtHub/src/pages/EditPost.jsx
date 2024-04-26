import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase';
import '../index.css';
import PostEdit from '../components/PostEdit';

function EditPost() {
    return (
        <div className='create-post'>
            <h1>Create a New Post!</h1>
            <PostEdit />
        </div>
    );
}

export default EditPost;