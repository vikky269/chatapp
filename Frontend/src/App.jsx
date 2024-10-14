import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext'



function App() {
 
const {AuthUser} = useAuthContext()

  return (
    
    <div className='h-screen p-4 flex items-center justify-center'>
      <Routes>
        <Route path='/' element={ AuthUser ?  <Home /> : <Navigate to="/login" /> } />
        <Route path='/login' element={ AuthUser ?  <Navigate to="/" />  :  <Login />} />
        <Route path='/signup' element={AuthUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>

  )
}

export default App
