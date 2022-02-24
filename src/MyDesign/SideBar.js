import React from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { MdCompassCalibration } from "react-icons/md";
import { GiFilmProjector } from "react-icons/gi";
import { FiLogOut } from "react-icons/fi";

const SideBar = ({ toggle, setToggle }) => {
  return (
    <div>
      <Container>
        <Wrapper>
          <Navigation>
            <Nav
              onClick={() => {
                setToggle(false);
              }}
            >
              <Icon>
                <AiFillHome />
              </Icon>
              <span>Home</span>
            </Nav>
            <Nav
              onClick={() => {
                setToggle(false);
              }}
            >
              <Icon>
                {" "}
                <MdCompassCalibration />{" "}
              </Icon>
              <span>Vote</span>
            </Nav>
          </Navigation>
          <Space />
          <Hold>
            <Nav1
              onClick={() => {
                setToggle(false);
              }}
            >
              <Icon>
                <FiLogOut />
              </Icon>
              <span>LogOut</span>
            </Nav1>
          </Hold>
        </Wrapper>
      </Container>
    </div>
  );
};

export default SideBar;

const Space = styled.div`
  flex: 1;
`;

const Hold = styled.div`
  display: flex;
  justify-content: center;
  font-size: 30px;
  width: 100%;
`;

const Icon = styled.div``;

const Nav1 = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 30px;
  transform: scale(1);
  transition: all 350ms;
  width: 100%;
  justify-content: center;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transform: scale(1.02);
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  span {
    margin: 0 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 30px;
  transform: scale(1);
  transition: all 350ms;
  width: 100%;

  :hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transform: scale(1.02);
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }

  span {
    margin: 0 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
  }
`;

const Navigation = styled.div``;

const Wrapper = styled.div`
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: none;

  @media screen and (max-width: 900px) {
    width: 300px;
    height: calc(100vh - 100px);
    background-color: #004080;
    display: block;
    color: white;
  }
`;
