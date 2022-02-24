import React from "react";
import styled from "styled-components";
import { AiFillHome } from "react-icons/ai";
import { MdCompassCalibration } from "react-icons/md";
import { GiFilmProjector } from "react-icons/gi";

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
              <span>About</span>
            </Nav>
            <Nav
              onClick={() => {
                setToggle(false);
              }}
            >
              <Icon>
                <GiFilmProjector />
              </Icon>
              <span>Projects</span>
            </Nav>
          </Navigation>
        </Wrapper>
      </Container>
    </div>
  );
};

export default SideBar;

const Icon = styled.div``;

const Nav = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 30px;
  transform: scale(1);
  transition: all 350ms;

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

const Wrapper = styled.div``;

const Container = styled.div`
  display: none;

  @media screen and (max-width: 700px) {
    width: 300px;
    height: calc(100vh - 100px);
    background-color: #004080;
    display: block;
    color: white;
  }
`;
