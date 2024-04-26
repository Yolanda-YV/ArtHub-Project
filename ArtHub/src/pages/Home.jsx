import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import '../index.css';
import Post from '../components/Post';

function Home() {
    const navigate = useNavigate();
    /*const [posts, setPosts] = useState([
        {author:'user1', title: 'Image 1', description: 'Description of Image 1', image: './src/assets/IMG1.png'}, 
        {author:'user2', title: 'Image 2', description: 'Description of Image 2', image: './src/assets/IMG2.png'},
        {author:'user1', title: 'Image 3', description: 'Description of Image 3', image: './src/assets/IMG3.png'},
        {author:'user3', title: 'Image 4', description: 'Description of Image 4', image: './src/assets/IMG4.png'},
        {author:'user4', title: 'Image 5', description: 'Description of Image 5', image: './src/assets/IMG5.png'},
        {author:'user2', title: 'Image 6', description: 'Description of Image 6', image: './src/assets/IMG6.png'},
    ]);*/
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const { data, error } = await supabase.from('Post').select().order('created_at', {ascending: false});
                console.log(data);
                setPosts(data);
            } catch (error) {
                window.alert(`Error: ${error.message}`);
                return;
            }
        };
        getPosts();
    }, []);
    

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to ArtHub!</p>
            <div className='post-container'>
                {posts && posts.map((post, index) => (
                    <Post 
                        key={index} 
                        title={post.title} 
                        date={new Date(post.created_at).toLocaleString()} 
                        likes={post.likes}
                        image={post.image} id={post.id}/>
                ))}
            </div>
        </div>
    );
}

export default Home;