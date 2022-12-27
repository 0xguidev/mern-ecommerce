import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { Badge, NavDropdown } from 'react-bootstrap';

const Header = () => {
  const { loginState, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/' className={'fas nav-link'}>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='fas nav-link'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fa fa-shopping-cart'>
                    <Badge bg='secondary'>
                      {cartItems.length > 0 ? cartItems.length : null}
                    </Badge>
                  </i>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {loginState && user.isAdmin ? (
                <NavDropdown
                  title='Admin'
                  id='adminmenu'
                  className='fas nav-link'
                >
                  <LinkContainer
                    to='/admin/userlist'
                    className={'fas fa-address-card'}
                  >
                    <NavDropdown.Item> Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    to='/admin/productlist'
                    className={'fas fa-bookmark'}
                  >
                    <NavDropdown.Item> Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer
                    to='/admin/orderlist'
                    className={'fas fa-credit-card'}
                  >
                    <NavDropdown.Item> Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
              {loginState ? (
                <NavDropdown title={user.name} className={'fas nav-link'}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      <i className={'fas fa-sign-out-alt'}> Profile</i>
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/logout'>
                    <NavDropdown.Item>
                      <i className={'fas fa-sign-out-alt light'}> Log Out</i>
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
              {!loginState ? (
                <LinkContainer to='/singup' className={'fas nav-link'}>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              ) : null}
              {!loginState ? (
                <LinkContainer to='/login' className={'fas nav-link'}>
                  <Nav.Link>
                    <i className='fas fa-sign-in-alt'></i> Log In
                  </Nav.Link>
                </LinkContainer>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
