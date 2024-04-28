import { useState, useEffect } from 'react'
import supabase from './supabase'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(( {data: {session}} ) => {
      setSession(session)
    })
    const { data: {subscription} } = supabase.auth.onAuthStateChange(( _event, session ) => {
      setSession(session)
    })
    return () => {
      subscription.unsubscribe()
    }

  }, [])
  
  if (!session) {
    return (
      <div className='whole-page'>
        <Navbar signedIn={false} className="nav"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    )
  } else {
    return (
      <div className='whole-page'>
        <Navbar signedIn={true} user={session.user} className="nav"/>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/postdetail/:id" element={<PostDetail />} />
            <Route path="/editpost/:id" element={<EditPost />} />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App
