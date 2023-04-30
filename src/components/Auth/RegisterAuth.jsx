import React, { useState } from 'react'
import Register from '../Register';
import { publicRequest } from '../../requestMethod';
import { useNavigate } from 'react-router-dom';

const RegisterAuth = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const handleRegister=async(newUser)=>{
      setLoading(true);
        try {
          
            const res = await publicRequest.post("/auth/register", {
                email:newUser.email,
                password:newUser.password,
                confirm_password:newUser.confirm_password,
              });
        res.data && navigate("/login");
        alert("registered successfully");
      } catch (error) {
        navigate("/register"); 
        alert(error.response.data);
      }finally{
        setLoading(false);
       }
    }
  return (
    <Register onSaveUser={handleRegister} loading={loading}/>
  )
}

export default RegisterAuth;