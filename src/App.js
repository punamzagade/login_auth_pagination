import {BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginAuth from './components/Auth/LoginAuth';
import RegisterAuth from './components/Auth/RegisterAuth';
import Home from './components/Home';
import { useSelector } from 'react-redux';

function App() {
  const currentUser=useSelector(state=>state.auth.currentUser);
  const token=sessionStorage.getItem("token");
  const user=sessionStorage.getItem("user");
  const token1 = document.cookie.zaperon;
  
  return (
   <BrowserRouter>
   <Routes>
   {token && user && 
    <Route path="/" element={<Home />} />}

      <Route path="/login" element={<LoginAuth/>} />
      <Route path="/register" element={<RegisterAuth />} />
  
 
   </Routes>
   </BrowserRouter>
  );
}

export default App;
