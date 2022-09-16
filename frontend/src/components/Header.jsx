import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import {useSelector} from "react-redux";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState()
  const loginState = useSelector((state) => state.userLogin.loginState)
  useEffect(
      () => {
        if (loginState === false) {
          setLoginStatus(loginState)
        }else {
          setLoginStatus(loginState)
        }
      }, [loginState]
  )

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
                </Nav.Link>
              </LinkContainer>
              {(loginStatus) ?
                    <LinkContainer to="/logout">
                        <Nav.Link>
                            <i className={"fas fa-sign-out-alt"}> Log Out </i>
                        </Nav.Link>
                    </LinkContainer>: null
              }
              {!loginStatus ?
                  <LinkContainer to="/singup">
                      <Nav.Link>
                          <i className="fas fa-user"></i> Sign In
                      </Nav.Link>
                  </LinkContainer> : null
              }
              {!loginStatus ?
                <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-sign-in-alt"></i> Log In
                    </Nav.Link>
                </LinkContainer>: null
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
