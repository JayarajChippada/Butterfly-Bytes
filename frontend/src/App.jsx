import { Home, Dashboard, SignIn, SignUp, About, Projects, CreatePost, UpdatePost } from './pages/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Header, PrivateRoute, OnlyAdminPrivateRoute } from './components'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route element={<PrivateRoute />}> 
            <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}> 
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;