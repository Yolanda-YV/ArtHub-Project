import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import '../index.css';
import Comment from '../components/Comment';
import PostEdit from '../components/PostEdit';
import RedHeartIMG from '/src/assets/RedHeart.png';

function PostDetail() {
    const [details, setDetails] = useState(null);
    const [comments, setComments] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('Post').select().eq('id', id);
                setDetails(data[0]);
            } catch (error) {
                window.alert(`Error: ${error.message}`);
                return;
            }
        }
        fetchPost();
    }, []);
    useEffect(() => {
        const fetcComments = async () => {
            try {
                const { data, error } = await supabase.from('Comment').select().eq('post_id', id);
                setComments(data);
            } catch (error) {
                window.alert(`Error: ${error.message}`);
                return;
            }
        }
        fetcComments();
    }, [comments]);
    
    const onSaveComment = async (e) => {
        e.preventDefault();
        const content = e.target[0].value;
        const { data: { user } } = await supabase.auth.getUser();
        try {
            const { data, error } = await supabase.from('Comment').insert({
                user: user.user_metadata.display_name,
                content: content,
                user_id: user.id,
                post_id: id,
            });
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
        window.alert('Comment saved!');
    };
    const onLike = async (e) => {
        e.preventDefault();
        const newlikes = details.likes + 1;
        try {
            const { data, error } = await supabase.from('Post').update({likes: newlikes}).eq('id', id).select();
            if (error) {
                throw error;
            }
            setDetails(data[0]);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
        window.alert('Kudos given!');
    };
    const onDelete = async (e) => {
        try {
            const { data, error } = await supabase.from('Post').delete().eq('id', id);
            if (error) {
                throw error;
            }
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
        navigate('/');
        window.alert('Post deleted!');
    };
  
    return (
        <div className='post-fullinfo'>
            {details ? (
                <div className='post-detail-container'>
                    <div className='post-header'>
                        <h1>{details.title}</h1>
                        <div className='post-options'>
                            <button onClick={()=> navigate(`/editpost/${id}`)}>Edit</button>
                            <button onClick={onDelete}>Delete</button>
                        </div>
                    </div>
                    <div className='post-detail'>
                        <img src={details.image}/>
                        <h3>{details.user}</h3>
                        <p>{details.description}</p>
                        <div className='post-footer'>
                            <div className='reaction-div'>
                                <input type='image' src={RedHeartIMG} onClick={onLike}></input>
                                <p>{details.likes} Kudos</p>
                            </div>
                            <p>{new Date(details.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            ) : null}
            {comments ? (
                <div className='comments-container'>
                    <h2>Comments</h2>
                    <form onSubmit={onSaveComment}>
                        <textarea type='text' placeholder='Write a comment...'/>
                        <button type='submit'>Save</button>
                    </form>
                    {comments.map((comment, index) => (
                        <Comment key={index} username={comment.user} comment={comment.content} date={comment.created_at}/>
                    ))}
                </div>
            ) : null}
        </div>
    );
    
}

export default PostDetail;