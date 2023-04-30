import React, { useState } from 'react'
import Login from '../Login'
import { publicRequest } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess, logout} from '../../store/AuthReducer';

const LoginAuth = () => {
const navigate=useNavigate();
const dispatch=useDispatch();
const [loading, setLoading] = useState(false);

    const handleLogin=async(user)=>{
    dispatch(loginStart());
    setLoading(true);
       try {
        const res = await publicRequest.post("/auth/login", {
          email:user.email,
          password:user.password,
        });
        dispatch(loginSuccess(res.data)) && alert("Successfully Login");
        navigate("/");
        // document.cookie = `token=${res.data.accessToken}; path=/;`; 
  sessionStorage.setItem("token",res.data.accessToken);
  sessionStorage.setItem("user",res.data.email);
  setTimeout(()=>{
    sessionStorage.clear();
   dispatch(logout()); 
   navigate("/login");
  },24*60*60*1000);
       } catch (error) {
        alert(error.response.data);
        dispatch(loginFailure()) &&  navigate("/login");
       }finally{
        setLoading(false);
       }
    }
  return (
    <Login onSaveUser={handleLogin} loading={loading}/>
  )
}

export default LoginAuth