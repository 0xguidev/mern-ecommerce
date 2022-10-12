import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom';
import { asyncUserUpdateRequest } from '../redux/reducers/userReducer';

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
  const loginState = useSelector((state) => state.user.loginState);
  const error = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsError(error);
    }
    if (!loginState) {
      navigate('/');
    }
  }, [error, loginState]);

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

    await dispatch(asyncUserUpdateRequest(userData.password, token));
  };

  return (
    <Container className="main_container">
      <Container>
        <Row>
          <Col md={3}>
            <Form onSubmit={handleSubmit}>
              <h2>Edit Profile</h2>
              <Form.Group className="mb-3" controlId="updateName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={user.name}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="updateEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={user.email}
                  disabled={true}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="updatePassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="updateConfirmPassword">
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
                Update
              </Button>
              {isError ?? <Message varaiant={'danger'}>{error}</Message>}
            </Form>
          </Col>
          <Col md={9}>
            <h1>My Orders</h1>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default ProfileScreen;
