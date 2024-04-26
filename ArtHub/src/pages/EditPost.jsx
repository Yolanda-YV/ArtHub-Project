import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../supabase';
import '../index.css';
import PostEdit from '../components/PostEdit';

function EditPost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('Post').select().eq('id', id);
                setPost(data[0]);
                if (error) {
                    throw error;
                }
            } catch (error) {
                window.alert(`Error: ${error.message}`);
                return;
            }
        }
        fetchPost();
    }, []);
    return (
        <div className='create-post'>
            <h1>Create a New Post!</h1>
            {post ? <PostEdit title={post.title} description={post.description} image={post.image} /> : <PostEdit />}
        </div>
    );
}

export default EditPost;