import React from 'react';
import { useState } from 'react';

function PostEdit({image, title, description}) {
    const [currentIMG, setCurrentIMG] = useState(image ? image : './src/assets/NOIMG1.png');
    const [currentTitle, setCurrentTitle] = useState(title ? title : "");
    const [currentDescription, setCurrentDescription] = useState(description ? description : "");

    const onCreate = (e) => {
        e.preventDefault();
        let reader = new FileReader(); // new FileReader Object
        // Callback function to be called when the file is loaded
        reader.onloadend = () => {
            setCurrentIMG(reader.result);
        };
        // Reading file, when done, calls onloadend event
        reader.readAsDataURL(e.target[0].files[0]);
        window.alert('Post Created!\nTitle: ' + e.target[1].value + '\nDescription: ' + e.target[2].value);
    };

    return (
        <div className='postedit-container'>
            <img src={currentIMG}/>
            <form onSubmit={onCreate}>
                <input 
                    type='file' 
                    accept='.png,.jpg'/>
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