import { css } from "styled-components";

export const tab=props=>{
    return css`
    @media only screen and (max-width:1400px) {
        ${props}
    }
    `;
}

export const mobitab=props=>{
    return css`
    @media only screen and (max-width:768px){
        ${props}
    }
    `;
}

export const mobile=props=>{
    return css`
    @media only screen and (max-width:600px){
        ${props}
    }
    `;
}

export const mobi=props=>{
    return css`
    @media only screen and (max-width:450px){
        ${props}
    }
    `;
}