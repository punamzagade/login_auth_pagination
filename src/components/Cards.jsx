import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { TbPlayerTrackPrevFilled,TbPlayerTrackNextFilled} from 'react-icons/tb';


const Cards = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClick = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("https://api.pokemontcg.io/v2/cards?page=" + currentPage + "&pageSize=" + pageSize);

      setProduct(res.data.data);
      setTotalPages(res.data.totalPages);
    };
    getProducts();
  }, [currentPage, pageSize]);

 

  return (
    <div>
      <Container>
      {/* <Button onClick={() => handleClick(currentPage - 1)}><TbPlayerTrackPrevFilled/></Button> */}
        <Wrapper>
          {product.map((item) => {
            return (
              <Card key={item.id}>
                <h4 style={{ textAlign: "center", marginBottom: "10px" }}>
                  {item.artist}
                </h4>
                <Cardcon>
                  <Img src={item.images.large} />
                </Cardcon>

                <UserShow>
                  <UserShowBottom>
                    <UserShowTopTitle>
                      <UserShowLeftTitle>
                        <b>{item.name}</b>
                      </UserShowLeftTitle>
                      <UserShowRightTitle>
                        <b>HP :</b> {item.hp}
                      </UserShowRightTitle>
                    </UserShowTopTitle>
                    {item.attacks ? (
                      <UserShowInfo>
                        <UserShowUsername>
                          <b>Attacks: </b>
                        </UserShowUsername>
                        {item.attacks.map((itm, ind) => {
                          return (
                            <UserShowInfoTitle key={ind}>
                              {itm.name} ,
                            </UserShowInfoTitle>
                          );
                        })}
                      </UserShowInfo>
                    ) :  (<span style={{fontSize:"12px"}}><b>Attacks :</b>NA </span>)}
                    {item.abilities ? (
                    <UserShowInfo>
                      <UserShowUsername>
                        <b>Abilities :</b>
                      </UserShowUsername>
                      {item.abilities.map((itm, ind) => {
                          return (
                      <UserShowInfoTitle key={ind}>{itm.name}</UserShowInfoTitle>
                      );
                        })}
                      </UserShowInfo>
                    ) :  (<span style={{fontSize:"12px"}}><b>Abilities :</b>NA </span>)}
                  </UserShowBottom>
                </UserShow>
              </Card>
            );
          })}
        </Wrapper>
        {/* <Button onClick={() => handleClick(currentPage + 1)}><TbPlayerTrackNextFilled/></Button> */}
        <BtnGrp>
        <Button onClick={() => handleClick(currentPage - 1)}><TbPlayerTrackPrevFilled/></Button>
        <Button onClick={() => handleClick(currentPage + 1)}><TbPlayerTrackNextFilled/></Button>
        </BtnGrp>
      </Container>
    </div>
  );
};

export default Cards;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 20px 30px 10px 30px;
`;
const Card = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px;
  width: 200px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.bg};
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(20, 0, 0.75);
`;

const Cardcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const Img = styled.img`
  height: 200px;
  border-radius: 10px;
  object-fit: cover;
`;

const UserShow = styled.div`
  flex: 1;
  margin-top: 10px;
`;

const UserShowBottom = styled.div`
display: flex;
  flex-direction: column;
  margin-top: 10px;
`;
const UserShowTopTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserShowLeftTitle = styled.span`
font-weight: bold;
`;
const UserShowRightTitle = styled.span`

`;
const UserShowInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 0px;
`;

const UserShowUsername = styled.span`
  font-weight:bold;
  font-size: 12px;
  align-items: center;
  margin-right: 3px;
`;

const UserShowInfoTitle = styled.span`
  color: #282626;
  font-size: 10px;
`;
const BtnGrp=styled.div`
width: 80vw;
display: flex;
justify-content: space-around;
gap: 20px;
margin-bottom: 30px;
`;
const Button=styled.span`
margin:10px;
color: navy;
font-size: 30px;
cursor: pointer;
font-weight: bold;
transition: all 1s ease-in;
&:hover{
    transform: translate(-1px,3px) scale(1.1,1.1);
}
`;
