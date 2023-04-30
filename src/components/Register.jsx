import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { RiUserLine } from "react-icons/ri";
import { signUpSchema } from "./Schema";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import "../App.css";

const initialValues = {
  email: "",
  password: "",
  confirm_password:"",
};

const Register = (props) => {
  const [show, setShow] = useState({ visibl: false });
  const [showErr, setShowErr] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        props.onSaveUser(values);
        action.resetForm();
      },
    });
  
  const handlClick = (e) => {
    e.preventDefault();
    if (values.password.length < 8) {
      setShowErr(true);
    } else {
      setShow(!showErr);
    }
  };

  const hndleShow = (e) => {
    e.preventDefault();

    setShow({ visibl: !show.visibl });
  };

  return (
    <Container>
      <Wrapper>
        <Top>
          <TopU>
            <User>
              <RiUserLine />
            </User>
          </TopU>
          <TopHead>Welcome!</TopHead>
          <TopDesc>
            <Para> let's connect to your workspace.</Para>
            <Para>Please enter your email to continue.</Para>
          </TopDesc>
        </Top>
        <Form onSubmit={handleSubmit}>
          <Middle>
            <InputCon>
              <InputDiv>
                <Input
                  type="email"
                  placeholder="abc@gmail.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={handlClick}
                  required
                  style={{
                    border:
                      showErr && errors.email && touched.email && values.email
                        ? "1.5px solid red"
                        : "",
                  }}
                />
                <Label
                  className="label"
                  style={{
                    color:
                      showErr && errors.email && touched.email && values.email
                        ? "red"
                        : "",
                  }}
                >
                  Email Address
                </Label>
              </InputDiv>
              {showErr && errors.email && touched.email && values.email ? (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "10px",
                    margin: "2px",
                  }}
                >
                  {errors.email}
                </p>
              ) : null}
              <InputDiv style={{ marginTop: "15px" }}>
                <Input
                  type={show.visibl ? "text" : "password"}
                  placeholder=" "
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={handlClick}
                  required
                  style={{
                    border:
                      showErr &&
                      errors.password &&
                      touched.password &&
                      values.password
                        ? "1.5px solid red"
                        : "",
                  }}
                />
                <Label
                  className="label"
                  style={{
                    color:
                      showErr &&
                      errors.password &&
                      touched.password &&
                      values.password
                        ? "red"
                        : "",
                  }}
                >
                  password
                </Label>
                <EyeBtn onClick={hndleShow}>
                  {show.visibl ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </EyeBtn>
              </InputDiv>
              {showErr &&
              errors.password &&
              touched.password &&
              values.password ? (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "10px",
                    margin: "2px",
                  }}
                >
                  {errors.password}
                </p>
              ) : null}
               <InputDiv style={{ marginTop: "15px" }}>
                <Input
                  type={show.visibl ? "text" : "password"}
                  placeholder=" "
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onClick={handlClick}
                  required
                  style={{
                    border:
                    showErr &&
                    errors.confirm_password &&
                    touched.confirm_password &&
                    values.confirm_password
                        ? "1.5px solid red"
                        : "",
                  }}
                />
                <Label
                  className="label"
                  style={{
                    color:
                      showErr &&
                      errors.confirm_password &&
                      touched.confirm_password &&
                      values.confirm_password
                        ? "red"
                        : "",
                  }}
                >
                  confirm_password
                </Label>
                <EyeBtn onClick={hndleShow}>
                  {show.visibl ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </EyeBtn>
              </InputDiv>
              {showErr &&
              errors.confirm_password &&
              touched.confirm_password &&
              values.confirm_password ? (
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "10px",
                    margin: "2px",
                  }}
                >
                  {errors.confirm_password}
                </p>
              ) : null}
            </InputCon>
          </Middle>
          <Bottom>
          <Button type="submit">
  {props.loading ? (
    <Spin></Spin>
  ) : (
    "Sign Up"
  )}
</Button>
          </Bottom>
        </Form>
        <Link className="LINK" to="/login">
        <Span>Already have an account? Login here</Span>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 350px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const TopU = styled.div`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #e4e0e0;
  font-size: 55px;
  color: #3232b1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TopHead = styled.h2`
  margin: 5px;
  color: #060606d1;
`;
const TopDesc = styled.div`
  text-align: center;
  font-size: 12px;
  color: #505052;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Para = styled.div``;
const Form = styled.form`
  width: 100%;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;
const InputCon = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const InputDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const Input = styled.input`
  border: 1.5px solid lightgray;
  outline: none;
  padding: 7px;
  font-size: 12px;
  font-weight: bold;
  width: 100%;
  transition: all 0.3s;
  border-radius: 3px;
  cursor: pointer;
  &:focus,
  &:not(:placeholder-shown) {
    border: 2px solid #3232b1;
  }

  &:focus + .label,
  &:not(:placeholder-shown) + .label {
    top: -8px;
    color: #3232b1;
    font-size: 10px;
    font-weight: bold;
  }

  &::placeholder {
    font-size: 12px;
    color: #5b6868;
    font-weight: bold;
    opacity: 0;
    transition: all 0.3s;
  }
  &:focus::placeholder {
    opacity: 0;
    animation-delay: 0.2s;
  }
`;
const Label = styled.label`
  position: absolute;
  margin-left: 10px;
  font-size: 10px;
  padding: 0 2px;
  color: #9b9999;
  transition: all 0.2s;
  pointer-events: none;
  background-color: white;
  z-index: 1;
  &::before {
    content: "";
    height: 5px;
    position: absolute;
    left: 0;
    top: 10px;
    width: 100%;
    z-index: -1;
  }
`;
const EyeBtn = styled.span`
  position: absolute;
  margin-right: 10px;
  color: #565555;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  cursor: pointer;
`;
const Span = styled.span`
  font-size: 12px;
  margin: 5px 0px 10px 0px;
  color: #3232b1;  
  font-weight: bold;
  cursor: pointer;
`;
const Bottom = styled.div`
  width: 100%;
  margin-top: 10px;
`;
const Button = styled.button`
display: flex;
align-items: center;
justify-content: center;
  width: 100%;
  padding: 7px;
  border-radius: 2px;
  color: white;
  background-color: #3232b1;
  border: none;
  cursor: pointer;
`;
const Spin=styled.span`
display: flex;
align-items: center;
justify-content: center;
  width: 12px;
  height: 12px;
  border: 2px solid #2b3971; 
  border-top: 2px solid white; 
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  @keyframes spinner {
 to {
    transform: rotate(360deg);
  }
}
`;