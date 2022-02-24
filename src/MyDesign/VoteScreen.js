import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthProvider";

const Vote = () => {
  const { currentUser } = useContext(AuthContext);
  const url = "";
  const [getData, setGetData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggle1, setToggle1] = useState(false);
  const [who, setWho] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };
  const onToggle1 = () => {
    setToggle1(!toggle1);
  };

  const onWho = () => {
    setWho(!who);
  };

  const fetchData = async () => {
    const url =
      "https://codelab-fellows-election-api.herokuapp.com/api/candidate";
    const res = await axios.get(url);
    if (res) {
      setGetData(res.data.data);
    }
  };

  const castVote = async (id, oldPoint) => {
    const url =
      "https://codelab-fellows-election-api.herokuapp.com/api/candidate";

    await axios.patch(`${url}/${id}`, {
      point: oldPoint - 1,
      toggle: false,
      toggle1: false,
      who: null
    });
  };

  const deCastVote = async (id, oldPoint) => {
    const url =
      "https://codelab-fellows-election-api.herokuapp.com/api/candidate";

    await axios.patch(`${url}/${id}`, {
      point: oldPoint + 1,
      toggle: true,
      toggle1: true,
      who: currentUser.token
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Container>
        <Wrapper>
          <Position>
            <HeadTitle>President</HeadTitle>

            <CardHolder>
              {getData?.map((props) => (
                <div key={props._id}>
                  {props.position === "President" ? (
                    <Card key={props._id}>
                      <Image src={props.avatar} />
                      <Display>
                        <Name>{props.name}</Name>
                        <Name>{props.position}</Name>
                        <Name>{props.point}</Name>
                      </Display>
                      {/* <Input type="checkbox" /> */}

                      {props.toggle ? (
                        <div>
                          {who !== null ? (
                            <Button
                              onClick={() => {
                                console.log(
                                  "this is the ID: ",
                                  props._id,
                                  props.who,
                                  props.name
                                );
                                castVote(props._id, props.point);
                                onToggle();
                                onToggle1();
                              }}
                            >
                              Take back your Vote
                            </Button>
                          ) : null}
                        </div>
                      ) : (
                        <Button
                          bg
                          onClick={() => {
                            console.log(
                              "this is the ID: ",
                              props._id,
                              props.who,
                              props.name
                            );
                            deCastVote(props._id, props.point);
                            onToggle();
                            onToggle1();
                          }}
                        >
                          Vote for {props.name}
                        </Button>
                      )}
                    </Card>
                  ) : null}
                </div>
              ))}
            </CardHolder>
          </Position>
          <Position>
            <HeadTitle>VP/Secretary</HeadTitle>
            <CardHolder>
              {getData?.map((props) => (
                <div key={props._id}>
                  {props.position === "VP/Secretary" ? (
                    <Card key={props._id}>
                      <Image src={props.avatar} />
                      <Display>
                        <Name>{props.name}</Name>
                        <Name>{props.position}</Name>
                      </Display>
                      <Input type="checkbox" onClick={() => {}} />
                    </Card>
                  ) : null}
                </div>
              ))}
            </CardHolder>
          </Position>
          <Position>
            <HeadTitle>Program Coordinator/Publicity</HeadTitle>
            <CardHolder>
              {getData?.map((props) => (
                <div key={props._id}>
                  {props.position === "Program Coordinator/Publicity" ? (
                    <Card key={props._id}>
                      <Image src={props.avatar} />
                      <Display>
                        <Name>{props.name}</Name>
                        <Name>{props.position}</Name>
                      </Display>
                      <Input type="checkbox" />
                    </Card>
                  ) : null}
                </div>
              ))}
            </CardHolder>
          </Position>
          <Position>
            <HeadTitle>Fin Sec/Welfare</HeadTitle>
            <CardHolder>
              {getData?.map((props) => (
                <div key={props._id}>
                  {props.position === "Fin Sec/Welfare" ? (
                    <Card key={props._id}>
                      <Image src={props.avatar} />
                      <Display>
                        <Name>{props.name}</Name>
                        <Name>{props.position}</Name>
                      </Display>
                      <Input type="checkbox" />
                    </Card>
                  ) : null}
                </div>
              ))}
            </CardHolder>
          </Position>
          <Position>
            <HeadTitle>Treasurer/Chief whip</HeadTitle>
            <CardHolder>
              {getData?.map((props) => (
                <div key={props._id}>
                  {props.position === "Treasurer/Chief Whip" ? (
                    <Card key={props._id}>
                      <Image src={props.avatar} />
                      <Display>
                        <Name>{props.name}</Name>
                        <Name>{props.position}</Name>
                        <Name>{props.point}</Name>
                      </Display>
                      <Input type="radio" />
                    </Card>
                  ) : null}
                </div>
              ))}
            </CardHolder>
          </Position>
          <Space />

          <CastButton>Cast Your Vote</CastButton>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Vote;

// President, VP/Secretary, Program Coordinator/Publicity, Fin sec/welfare, Treasurer/Chief whip

const Space = styled.div``;
const CastButton = styled.div`
  margin-bottom: 40px;
  margin-top: 30px;
  padding: 20px 40px;
  background-color: #004080;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const CardHolder = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 50px;
`;
const Position = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;
const HeadTitle = styled.div`
  font-weight: bold;
  font-size: 30px;
`;

const Input = styled.input`
  margin-top: 20px;
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
  background: ${({ bg }) => (bg ? "#004080" : "red")};
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
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 80px);
  height: 100%;
  background-color: lightgray;
`;
