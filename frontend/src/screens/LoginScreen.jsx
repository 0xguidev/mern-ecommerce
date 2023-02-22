import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { asyncUserLoginRequest } from '../redux/reducers/user';

function LoginScreen() {
  const [userData, setUserData] = useState({ email: '', pass: '' });
  const [isError, setIsError] = useState('');

  const dispatch = useDispatch();
  const { errorLogin, loginState } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorLogin) {
      setIsError(errorLogin);
    }
    if (loginState) {
      navigate('/');
    }
  }, [errorLogin, loginState, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncUserLoginRequest(userData.email, userData.pass));
  };

  return (
    <Container className='container-form'>
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
            {isError ? (
              <Row>
                <Message variant='danger'>{errorLogin}</Message>
                <Form.Text muted>{errorLogin}</Form.Text>
              </Row>
            ) : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
