import { Home, Dashboard, SignIn, SignUp, About, Projects } from './pages/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Header, PrivateRoute } from './components'

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
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;