import React from 'react';

function Post({image, title, author}) {
    return (
        <div className='post'>
            <div className='img-container'>
                <img src={image}/>
            </div>
            <div className='binfo-container'>
                <h2>{title}</h2>
                <p>{author}</p>
            </div>
            
        </div>
    );
}

export default Post;