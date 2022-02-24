import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Logo>CodeLab Fellows</Logo>

          <Navigation>
            <Nav>Home</Nav>
            <Nav>About</Nav>
            <Nav>Projects</Nav>
          </Navigation>

          <Menu onClick={onToggle} />
        </Wrapper>
      </Container>

      {toggle ? <SideBar toggle={toggle} setToggle={setToggle} /> : null}
    </div>
  );
};

export default Header;

const Menu = styled(FiMenu)`
  display: none;

  @media screen and (max-width: 700px) {
    display: block;

    margin: 0 20px;
    font-size: 40px;
    transition: all 350ms;
    transform: scale(1);
    color: #004080;

    :hover {
      transform: scale(0.97);
      cursor: pointer;
    }
  }
`;

const Nav = styled.div`
  padding: 15px 30px;
  margin: 0 7px;
  border-radius: 3px;
  transition: all 350ms;
  background-color: rgba(0, 64, 128, 0.1);

  :hover {
    background-color: #004080;
    color: white;
    cursor: pointer;
  }
`;

const Navigation = styled.div`
  display: flex;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Logo = styled.div`
  width: 100px;
  /* height: 45px; */
  border-radius: 3px;
  object-fit: cover;
  margin: 0 10px;
  overflow: hidden;
  font-weight: bold;
  font-style: italic;
  color: #004080;
`;

const Wrapper = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background-color: whitesmoke;
`;
