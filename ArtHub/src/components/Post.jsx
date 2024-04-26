import React from 'react';
import { useNavigate } from 'react-router-dom';
import RedHeartIMG from '/src/assets/RedHeart.png';

function Post({image, title, date, likes, id}) {
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
                <p>{date}</p>
                <p><img src={RedHeartIMG}/>Kudos: {likes}</p>
            </div>
            
        </div>
    );
}

export default Post;