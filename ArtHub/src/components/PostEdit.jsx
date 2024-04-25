import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';

function PostEdit({image, title, description}) {
    const navigate = useNavigate();
    const [currentIMG, setCurrentIMG] = useState(image ? image : './src/assets/NOIMG1.png');
    const [currentTitle, setCurrentTitle] = useState(title ? title : "");
    const [currentDescription, setCurrentDescription] = useState(description ? description : "");

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
        window.alert(`Post Created!\nUser: ${user.user_metadata.display_name}`)
    };

    return (
        <div className='postedit-container'>
            <img src={currentIMG}/>
            <form onSubmit={onCreate}>
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
                <button type='submit'>Save</button>
            </form>
        </div>
    );
}

export default PostEdit;