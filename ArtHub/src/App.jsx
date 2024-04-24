import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='whole-page'>
      <Navbar className="nav"/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
