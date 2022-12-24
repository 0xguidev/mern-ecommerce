import { Col, Container, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { asyncUserUpdateRequest } from '../redux/reducers/userReducer';
import { getUserOrders } from '../redux/reducers/ordersReducer';

function ProfileScreen() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassord: '',
    isDisabled: true,
  });
  const [isError, setIsError] = useState('');

  const dispatch = useDispatch();
  const {
    loginState,
    error,
    user,
  } = useSelector((state) => state.user);
  const { userOrders} = useSelector(
    (state) => state.orders
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsError(error);
    }
    if (!userOrders) {
      dispatch(getUserOrders());
    }
    if (!loginState) {
      navigate('/');
    }
  }, [error, loginState, navigate, dispatch, userOrders]);

  useEffect(() => {
    if (typeof userData.password === 'string') {
      if (userData.password !== '') {
        if (userData.password.length >= 8) {
          if (userData.password === userData.confirmPassord) {
            setUserData({ ...userData, isDisabled: false });
          } else {
            setUserData({ ...userData, isDisabled: true });
          }
        }
      }
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUserUpdateRequest(userData.password));
  };

  return (
    <Container className='main_container'>
      <Container>
        <Row>
          <Col md={3}>
            <Form onSubmit={handleSubmit}>
              <h2>Edit Profile</h2>
              <Form.Group className='mb-3' controlId='updateName'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={user.name}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='updateEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={user.email}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='updatePassword'>
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='updateConfirmPassword'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  onChange={(e) =>
                    setUserData({ ...userData, confirmPassord: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                <Form.Check type='checkbox' label='Check me out' />
              </Form.Group>

              <Button
                variant='primary'
                type='submit'
                disabled={userData.isDisabled}
              >
                Update
              </Button>
              {isError ?? <Message varaiant={'danger'}>{error}</Message>}
            </Form>
          </Col>
          <Col md={9}>
            <h1>My Orders</h1>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!userOrders ? 
                  null
                  : userOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivery ? (
                          order.deliveryAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td> 
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button variant='light'>Details</Button>
                      </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ProfileScreen;
