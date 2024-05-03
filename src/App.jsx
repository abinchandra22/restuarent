import { useContext, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Stores from './pages/Stores';
// import View from './pages/view';
import View from './pages/View'
import { tokenAuthContext } from './context/TokenAuth';

function App() {
  const { isAuthorised, setIsAuthorised } = useContext(tokenAuthContext)

  return (
    <>
      <Routes>
        <Route path='/'element={<Home/>}></Route>
        <Route path='/login'element={<Auth/>}></Route>
        <Route path='/register'element={<Auth insideRegister/>}></Route>
        <Route path='/dashboard'element={isAuthorised? <Dashboard/>:<Home/>}></Route>
        <Route path='/stores'element={isAuthorised? <Stores/>:<Home/>}></Route>
        <Route path='/view'element={<View/>}></Route>
        <Route path='/*'element={<Navigate to={'/'}/>}></Route>
      </Routes>
    </>
      
  )
}

export default App
