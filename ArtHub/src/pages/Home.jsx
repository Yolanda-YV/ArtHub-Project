import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabase';
import '../index.css';
import Post from '../components/Post';

function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState(null);
    const [search, setSearch] = useState(null);
    const [ascendingKudos, setAscendingKudos] = useState(true);
    const [ascendingTime, setAscendingTime] = useState(true);

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
    
    const onSearch = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('Post').select().ilike('title', '%'+search+'%');
            console.log(data);
            setPosts(data);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
    };
    const onFilterByKudos = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('Post').select().order('likes', {ascending: ascendingKudos});
            console.log(data);
            setPosts(data);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
    };
    const onFilterByTime = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.from('Post').select().order('created_at', {ascending: ascendingTime});
            console.log(data);
            setPosts(data);
        } catch (error) {
            window.alert(`Error: ${error.message}`);
            return;
        }
    };
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to ArtHub!</p>
            <div className='filter-forms'>
                <form>
                    <input type='text' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                    <button type='submit' onClick={onSearch}>Search</button>
                </form>
                <div>
                    <form onSubmit={onFilterByKudos}>
                        <select onChange={(e)=>setAscendingKudos(e.target.value === 'true')}>
                            <option value={false}>High to Low</option>
                            <option value={true}>Low to High</option>
                        </select>
                        <button type='submit'>Filter by Kudos</button>
                    </form>
                    <form onSubmit={onFilterByTime}>
                        <select onChange={(e)=>setAscendingTime(e.target.value === 'true')}>
                            <option value={false}>Oldest to Newest</option>
                            <option value={true}>Newest to Oldest</option>
                        </select>
                        <button type='submit'>Filter by Time Created</button>
                    </form>
                </div>
            </div>
            
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