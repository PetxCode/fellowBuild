import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [getData, setGetData] = useState([]);

  const fetchData = async () => {
    const url =
      "https://codelab-fellows-election-api.herokuapp.com/api/candidate";
    const res = await axios.get(url);
    console.log(res.data);
    if (res) {
      setGetData(res.data.data);
      console.log(getData);
    }
  };

  const deleteData = async (id) => {};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <NameHolder>Welcome Back {currentUser?.name}</NameHolder>
        <Wrapper>
          {getData?.map((props) => (
            <Card key={props._id}>
              <Image src={props.avatar} />
              <Display>
                <Name>{props.name}</Name>
                <Name>{props.position}</Name>
              </Display>
              <But>
                {/* <Button onClick={() => {}}>Delete</Button> */}

                {/* <Nav to={`/`}>Enter</Nav> */}
              </But>
            </Card>
          ))}
        </Wrapper>
      </Container>
    </div>
  );
};

export default Home;

const NameHolder = styled.div`
  padding-top: 50px;
  width: 100%;
  justify-content: center;
  display: flex;
  font-weight: bold;
`;

const But = styled.div`
  display: flex;
`;

const Nav = styled(Link)`
  text-decoration: none;
  border-radius: 5px;
  padding: 20px 40px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;
  margin: 10px;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const Button = styled.div`
  border-radius: 5px;
  padding: 20px 40px;
  background: #004080;
  color: white;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);
  margin-bottom: 20px;
  margin: 10px;

  :hover {
    cursor: pointer;
    transform: scale(0l97);
  }
`;

const Card = styled.div`
  margin: 20px;
  width: 300px;
  background: white;
  border-radius: 5px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
`;
const Name = styled.div``;

const Display = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50px;
  object-fit: cover;
  background: orange;
  margin-top: -30px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  height: 100%;
  background-color: lightgray;
`;
