import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { asyncRegisterRequest } from '../redux/reducers/user';

const SingUpScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassord: '',
    isDisabled: true,
  });

  const dispatch = useDispatch();
  const { loginState, errorLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState) {
      navigate('/');
    }
  }, [errorLogin, loginState, navigate]);

  useEffect(() => {
    if (userData.password !== '' && userData.password.length >= 8) {
      if (userData.password === userData.confirmPassord) {
        setUserData({ ...userData, isDisabled: false });
      } else {
        setUserData({ ...userData, isDisabled: true });
      }
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncRegisterRequest(userData));
  };

  return (
    <Container className='container-form'>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                onChange={(e) => {
                  setUserData({ ...userData, name: e.target.value });
                }}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              {userData.password.length < 8 && userData.password !== '' ? (
                <Message variant='warning'>
                  Password do not less than 8 charcteres
                </Message>
              ) : null}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicConfirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassord: e.target.value })
                }
              />
              {userData.password !== userData.confirmPassord &&
              userData.confirmPassord !== '' ? (
                <Message variant='warning'>Password do not match</Message>
              ) : null}
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='I agree with terms of usage' />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              disabled={userData.isDisabled}
            >
              Register
            </Button>
            {errorLogin ? (
              <Message variant='danger'>{errorLogin}</Message>
            ) : null}
          </Col>
        </Row>
        <Row className='py-3'>
          <Col>
            Have an account?
            <Link to={'/login'}> Login</Link>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SingUpScreen;
