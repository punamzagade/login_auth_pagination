import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import "../App.css"
import { useDispatch } from 'react-redux'
import { logout } from '../store/AuthReducer'
import Cards from './Cards'
import { mobile } from '../responsive'

const Home = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const token=sessionStorage.getItem("token");
  const user=sessionStorage.getItem("user");


  const handleLogout=()=>{
    sessionStorage.clear();
    dispatch(logout());
    navigate("/login");
  }
  
  return (
    <Container>
        <Wrapper>
            <Title>Welcome {user && (user.slice(0,user.indexOf("@")))}</Title>
           <BtnGroup>
            {token && user && <Button onClick={handleLogout}>
            Logout
            </Button>}
            </BtnGroup>
        </Wrapper>
        {token && user && <Cards/>}
    </Container>
  )
}

export default Home


const Container=styled.div`
width: 100%;
overflow: hidden;
`;
const Wrapper=styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
${mobile({flexDirection:"column-reverse",gap:"20px"})}
`;
const Title=styled.h2`
color: navy;
margin-left: 20px;
animation: anim 20s ease-in alternate infinite;
  @keyframes anim {
    0%   {color: #bd2990;}
  25%  {color: navy;}
  50%  {color: #8712d5eb;}
  100% {color: #317ad9;}
  }
 
`;
const BtnGroup=styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const Button=styled.button`
margin: 0px 10px;
padding: 10px;
width: 100px;
outline: none;
background-color: navy;
color: white;
border: none;
border-radius: 10px;
box-shadow: 2px 5px 20px 1px blue;
cursor: pointer;
font-weight: bold;
transition: all 1s ease-in;
&:hover{
    transform: translate(-1px,3px) scale(1.1,1.1);
}
`;
