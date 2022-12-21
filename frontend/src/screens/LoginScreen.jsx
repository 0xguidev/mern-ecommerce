import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncUserLoginRequest } from '../redux/reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Message from '../components/Message';

function LoginScreen() {
  const [userData, setUserData] = useState({ email: '', pass: '' });
  const [isError, setIsError] = useState('');

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const loginState = useSelector((state) => state.user.loginState);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setIsError(error);
    }
    if (loginState) {
      navigate('/');
    }
  }, [error, loginState, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUserLoginRequest(userData.email, userData.pass));
  };

  return (
    <Container className='main_container'>
      <h1>Login Screen</h1>
      <Row>
        <Col>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                required
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
                required
                onChange={(e) =>
                  setUserData({ ...userData, pass: e.target.value })
                }
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Login
            </Button>

            <Row className='py-3'>
              <Col>
                New Customer? <Link to={'/singup'}>Register</Link>
              </Col>
            </Row>
            {isError ?? (
              <Row>
                <Message variant='danger'>{error}</Message>
                <Form.Text muted>{error}</Form.Text>
              </Row>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
