import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function ProtectedRoute({ children, redirectTo = '/login', isAuthenticated }) {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate(redirectTo);
  }
  return children;
}
function App() {

  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])
  return (
    <>
      <Routes>
        {/*public route*/}
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        {/*protected route*/}
        <Route path='/' element={
          <ProtectedRoute isAuthenticated={token ? true : false}>
            <Home></Home>
          </ProtectedRoute>}></Route>

      </Routes>
    </>
  )
}

export default App
