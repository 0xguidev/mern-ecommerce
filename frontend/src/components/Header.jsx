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
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='m-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'>
                    <Badge bg='secondary'>
                      {cartItems.length > 0 ? cartItems.length : null}
                    </Badge>
                  </i>{' '}
                  Cart
                </Nav.Link>
              </LinkContainer>
              {loginState ?? (
                <NavDropdown title={user.name}>
                  <LinkContainer to='/profile'>
                    <Nav.Link>
                      <i className={'fas fa-sign-out-alt nav-link'}>
                        {' '}
                        Profile{' '}
                      </i>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/logout'>
                    <Nav.Link>
                      <i className={'fas fa-sign-out-alt nav-link'}>
                        {' '}
                        Log Out{' '}
                      </i>
                    </Nav.Link>
                  </LinkContainer>
                </NavDropdown>
              )}
              {!loginState ? (
                <LinkContainer to='/singup'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              ) : null}
              {!loginState ? (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-sign-in-alt'></i> Log In
                  </Nav.Link>
                </LinkContainer>
              ) : null}
              {loginState && user.isAdmin ? (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
