import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Container, Row } from 'react-bootstrap';
import { asyncRegisterRequest } from '../redux/reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';

const SingUpScreen = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassord: '',
    isDisabled: true,
  });
  const [isError, setIsError] = useState('');

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.user.loginState);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsError(error);
    }
    if (loginState) {
      navigate('/');
    }
  }, [error, loginState, navigate]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(asyncRegisterRequest(userData));
  };

  return (
    <Container className="main_container">
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassord: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={userData.isDisabled}
            >
              Register
            </Button>
            {isError ?? <Message variant="danger">{error}</Message>}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default SingUpScreen;
