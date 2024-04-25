import React from 'react';
import { useNavigate } from 'react-router-dom';

function Post({image, title, user, id}) {
    const navigate = useNavigate();
    const onPostClick = (e) => {
        const id = e.target.id;
        console.log('clicked on post ' + id);
        navigate(`/postdetail/${id}`);
    }
    return (
        <div className='post'>
            <div className='img-container'>
                <img src={image} id={id} onClick={onPostClick}/>
            </div>
            <div className='binfo-container'>
                <h2>{title}</h2>
                <p>{user}</p>
            </div>
            
        </div>
    );
}

export default Post;