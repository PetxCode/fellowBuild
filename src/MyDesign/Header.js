import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { FiMenu } from "react-icons/fi";
import SideBar from "./SideBar";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  const [toggle, setToggle] = useState(false);

  const onToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <Container>
        <Wrapper>
          <Logo />
          <Navigation>
            <Place>
              <Nav1 to="/">Home</Nav1>
              {currentUser ? <Nav1 to="/vote">Vote</Nav1> : null}
              {currentUser?.isAdmin ? (
                <Nav1 to="/candidate">Add Candidate</Nav1>
              ) : null}
            </Place>

            <Place>
              {!currentUser ? (
                <div>
                  {" "}
                  <Nav1 to="/register">Register</Nav1>
                  <Nav1 to="/signin">Sign</Nav1>
                </div>
              ) : (
                <Nav
                  onClick={() => {
                    localStorage.removeItem("voter");
                  }}
                >
                  LogOut
                </Nav>
              )}
            </Place>
          </Navigation>

          <Menu
            onClick={() => {
              onToggle();
              console.log(toggle);
            }}
          />
        </Wrapper>
      </Container>

      {toggle ? <SideBar toggle={toggle} setToggle={setToggle} /> : null}
    </div>
  );
};

export default Header;

const Menu = styled(FiMenu)`
  display: none;

  @media screen and (max-width: 900px) {
    display: block;

    margin: 0 20px;
    font-size: 40px;
    transition: all 350ms;
    transform: scale(1);
    color: white;

    :hover {
      transform: scale(0.97);
      cursor: pointer;
    }
  }
`;

const Logo = styled.img`
  width: 150px;
  height: 50px;
  object-fit: cover;
  margin: 20px;
`;

const Place = styled.div`
  display: flex;
`;

const Nav1 = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 20px 35px;
  margin: 0 10px;
  transform: scale(1);
  transition: all 350ms;
  border-radius: 3px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
`;
const Nav = styled.div`
  padding: 20px 35px;
  margin: 0 10px;
  transform: scale(1);
  transition: all 350ms;
  border-radius: 3px;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;

  :hover {
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
  }
`;

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;

  @media screen and (max-width: 900px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100px;
  background: #004080;
  color: white;
`;
