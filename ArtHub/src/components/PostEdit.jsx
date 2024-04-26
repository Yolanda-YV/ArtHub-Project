import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import supabase from '../supabase';
import { v4 as uuidv4 } from 'uuid'; //to generate unique id for images uploaded to storage
import { HashLoader } from 'react-spinners';

function PostEdit() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
            } catch (error) {
                window.alert(`Error: ${error.message}`);
                return;
            }
        }
        if (id) {
            fetchPost();
        } else {
            setLoading(false);
        }
    }, []);

    const getURL = (path) => {
        const { data } = supabase.storage.from('ArtWork').getPublicUrl(path);
        return data;
    };
    const onCreate = async (e) => {
        e.preventDefault();
        // Getting file input
        const file = e.target[0].files[0];
        console.log(file);
        // Getting the current user
        const { data: { user } } = await supabase.auth.getUser();
        // Inserting the post into the database
        try {
            // Uploading the image to the storage
            const filePath = `${user.id}/${uuidv4()}`;
            const { imgdata, imgerror } = await supabase.storage
                .from('ArtWork')
                .upload(filePath, file); 
            if (imgerror) {
                throw imgerror;
            }
            const publicURL = getURL(filePath);
            const { data, error } = await supabase.from('Post').insert({
                user_id: user.id,
                user: user.user_metadata.display_name,
                title: currentTitle,
                description: currentDescription,
                image: publicURL
            });
            if (error) {
                throw error;
            }
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
    return (
        <>
            {loading ? (
                <div className='loader-div'>
                    <HashLoader 
                        loading={loading}
                        size={100}
                        color='#4B1212'/>
                </div>   
            ) : (
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
            )}
        </> 
    );
}

export default PostEdit;