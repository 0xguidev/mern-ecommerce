import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {asyncUserLoginRequest} from "../redux/reducers/userLoginReducer";
import {Link, useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function LoginScreen() {
    const [userData, setUserData] = useState({email: '', pass: ''});
    const [isError, setIsError] = useState('');

    const dispatch = useDispatch();
    const error = useSelector((state) => state.userLogin.error)
    const loginState = useSelector((state) => state.userLogin.loginState)
    const navigate = useNavigate()

    useEffect(
        () => {
            if (error) {
                setIsError(error)
            }
            if (loginState) {
                navigate('/')
            }
        }, [error, loginState]
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(asyncUserLoginRequest(userData.email, userData.pass))
    };

    return (<Container>
            <Row className='justify-content-center'>
                <Col xs={6} md={3}>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                required
                                onChange={(e) => setUserData({...userData, email: e.target.value})}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setUserData({...userData, pass: e.target.value})}
                            />
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                        >
                            Submit
                        </Button>

                            <Row className="py-3">
                                <Col>
                                    New Customer?{' '}
                                    <Link to={'/singup'}>
                                        Register
                                    </Link>
                                </Col>
                            </Row>
                        {
                            (isError) ??
                            <Row>
                                <Form.Text muted>
                                    {error}
                                </Form.Text>
                            </Row>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginScreen;