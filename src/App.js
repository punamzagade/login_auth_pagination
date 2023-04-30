import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginAuth from './components/Auth/LoginAuth';
import RegisterAuth from './components/Auth/RegisterAuth';
import Home from './components/Home';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function App() {
  const currentUser=useSelector(state=>state.auth.currentUser);
  const [log,setLog]=useState(false);
  const token=sessionStorage.getItem("token");
  const user=sessionStorage.getItem("user");
  const token1 = document.cookie.zaperon;
  
  return (
   <BrowserRouter>
   <Routes>
  
    <Route path="/" element={token && user ? <Home setLog={setLog}/> : <LoginAuth/>} />

 {log && <Route path="/login" element={<LoginAuth/>} />}
      <Route path="/register" element={<RegisterAuth />} />
  
 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
