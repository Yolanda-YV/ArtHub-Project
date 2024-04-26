import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../supabase';

function PostEdit({image, title, description}) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [currentIMG, setCurrentIMG] = useState(null);
    const [currentTitle, setCurrentTitle] = useState(null);
    const [currentDescription, setCurrentDescription] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase.from('Post').select().eq('id', id);
                setCurrentIMG(data[0].image);
                setCurrentTitle(data[0].title);
                setCurrentDescription(data[0].description);
                console.log(data[0]);
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

    const onCreate = async (e) => {
        e.preventDefault();
        // Getting the current user
        const { data: { user } } = await supabase.auth.getUser();
        // Inserting the post into the database
        try {
            const { data, error } = await supabase.from('Post').insert({
                user_id: user.id,
                user: user.user_metadata.display_name,
                title: currentTitle,
                description: currentDescription,
                image: currentIMG
            });
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
        navigate('/');
        window.alert(`Post Created!`)
    };
    const onUpdate = async (e) => {
        e.preventDefault();
        // Updating the post in the database
        try {
            const { data, error } = await supabase.from('Post').update({
                title: currentTitle,
                description: currentDescription,
                image: currentIMG,
            }).eq('id', id);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
        navigate(-1)
        window.alert('Post Updated!');
    };
    console.log(currentIMG, currentTitle, currentDescription);
    return (
        <div className='postedit-container'>
            <img src={currentIMG ? currentIMG : "/src/assets/NOIMG1.png"}/>
            <form onSubmit={id ? onUpdate : onCreate}>
                <input 
                    type='file' 
                    accept='.png,.jpg'
                    onChange={e => {
                        let reader = new FileReader(); // new FileReader Object
                        // Callback function to be called when the file is loaded
                        reader.onloadend = () => {
                            setCurrentIMG(reader.result);
                        };
                        // Reading file, when done, calls onloadend event
                        reader.readAsDataURL(e.target.files[0]);
                    }}/>
                <input 
                    type='text' 
                    placeholder='Title' 
                    value={currentTitle}
                    onChange={e => setCurrentTitle(e.target.value)} />
                <textarea 
                    placeholder='Description' 
                    value={currentDescription}
                    onChange={e => setCurrentDescription(e.target.value)} />
                <div className='postedit-btn'>
                    <button type='button' onClick={() => navigate(-1)}>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default PostEdit;